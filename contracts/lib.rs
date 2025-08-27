use anchor_lang::prelude::*;
use anchor_spl::token::{self, Token, TokenAccount, Transfer};

declare_id!("YOUR_PROGRAM_ID");

#[program]
pub mod escrow {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>, amount: u64) -> Result<()> {
        let escrow = &mut ctx.accounts.escrow;
        escrow.initializer = ctx.accounts.initializer.key();
        escrow.initializer_amount = amount;
        escrow.state = EscrowState::Initialized;
        Ok(())
    }

    pub fn accept(ctx: Context<Accept>) -> Result<()> {
        let escrow = &mut ctx.accounts.escrow;
        require!(escrow.state == EscrowState::Initialized, ErrorCode::InvalidState);
        
        escrow.state = EscrowState::Accepted;
        
        let transfer_instruction = Transfer {
            from: ctx.accounts.escrow_token_account.to_account_info(),
            to: ctx.accounts.freelancer_token_account.to_account_info(),
            authority: ctx.accounts.escrow.to_account_info(),
        };
        
        let cpi_ctx = CpiContext::new(
            ctx.accounts.token_program.to_account_info(),
            transfer_instruction,
        );
        
        token::transfer(cpi_ctx, escrow.initializer_amount)?;
        
        Ok(())
    }

    pub fn refund(ctx: Context<Refund>) -> Result<()> {
        let escrow = &mut ctx.accounts.escrow;
        require!(
            escrow.state == EscrowState::Initialized || escrow.state == EscrowState::Disputed, 
            ErrorCode::InvalidState
        );
        
        escrow.state = EscrowState::Refunded;
        
        let transfer_instruction = Transfer {
            from: ctx.accounts.escrow_token_account.to_account_info(),
            to: ctx.accounts.initializer_token_account.to_account_info(),
            authority: ctx.accounts.escrow.to_account_info(),
        };
        
        let cpi_ctx = CpiContext::new(
            ctx.accounts.token_program.to_account_info(),
            transfer_instruction,
        );
        
        token::transfer(cpi_ctx, escrow.initializer_amount)?;
        
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer = initializer, space = Escrow::LEN)]
    pub escrow: Account<'info, Escrow>,
    #[account(mut)]
    pub initializer: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Accept<'info> {
    #[account(mut)]
    pub escrow: Account<'info, Escrow>,
    #[account(mut)]
    pub escrow_token_account: Account<'info, TokenAccount>,
    #[account(mut)]
    pub freelancer_token_account: Account<'info, TokenAccount>,
    pub token_program: Program<'info, Token>,
}

#[derive(Accounts)]
pub struct Refund<'info> {
    #[account(mut)]
    pub escrow: Account<'info, Escrow>,
    #[account(mut)]
    pub escrow_token_account: Account<'info, TokenAccount>,
    #[account(mut)]
    pub initializer_token_account: Account<'info, TokenAccount>,
    pub token_program: Program<'info, Token>,
}

#[account]
pub struct Escrow {
    pub initializer: Pubkey,
    pub initializer_amount: u64,
    pub state: EscrowState,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, PartialEq, Eq)]
pub enum EscrowState {
    Initialized,
    Accepted,
    Refunded,
    Disputed,
}

impl Escrow {
    pub const LEN: usize = 8 + 32 + 8 + 1;
}

#[error_code]
pub enum ErrorCode {
    #[msg("Invalid escrow state")]
    InvalidState,
}