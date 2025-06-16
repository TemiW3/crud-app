#![allow(clippy::result_large_err)]
#![allow(unexpected_cfgs)]

use anchor_lang::prelude::*;

declare_id!("FqzkXZdwYjurnUKetJCAvaUw5WAqbwzU6gZEwydeEfqS");

#[program]
pub mod todo_list {
    use super::*;

    // The main entry point for the program
    // Instructions to create, update, add, and remove items from a to-do list entry

    pub fn create_to_do_list_entry(ctx: Context<CreateList>, first_item: String) -> Result<()>{
        require!(first_item.len() <= 100, ToDoError::ItemTooLong);
        let to_do_list_entry = &mut ctx.accounts.to_do_list_entry;
        to_do_list_entry.owner = ctx.accounts.owner.key();
        to_do_list_entry.list_item = vec![first_item];

        Ok(())
    }

    pub fn update_to_do_list_entry(ctx: Context<UpdateEntry>, item_index: u32, new_item: String) -> Result<()> {
        require!(new_item.len() <= 100, ToDoError::ItemTooLong);

        let to_do_list_entry = &mut ctx.accounts.to_do_list_entry;

        if item_index as usize >= to_do_list_entry.list_item.len() {
            return Err(error!(ToDoError::WrongIndex));
        }
        to_do_list_entry.list_item[item_index as usize] = new_item;

        Ok(())
    }


    pub fn add_item_to_to_do_list_entry(ctx: Context<AddItem>, new_item: String) -> Result<()> {
        require!(new_item.len() <= 100, ToDoError::ItemTooLong);

        let to_do_list_entry = &mut ctx.accounts.to_do_list_entry;

        if to_do_list_entry.list_item.len() >= 50 {
            return Err(error!(ToDoError::ListFull));
        }

        to_do_list_entry.list_item.push(new_item);

        Ok(())
    }

    pub fn remove_item_from_to_do_list_entry(ctx: Context<AddItem>, item_index: u32) -> Result<()> {
        let to_do_list_entry = &mut ctx.accounts.to_do_list_entry;

        if item_index as usize >= to_do_list_entry.list_item.len() {
            return Err(error!(ToDoError::WrongIndex));
        }

        to_do_list_entry.list_item.remove(item_index as usize);

        Ok(())
    }
   
}


// Contexts for the instructions
#[derive(Accounts)]
pub struct CreateList<'info>{
    #[account(init, 
        seeds = [b"todo", owner.key().as_ref()], 
        bump, 
        payer = owner, 
        space = 8 + 32 + 4 + (50 * (4 + 100)))]
    pub to_do_list_entry: Account<'info, ToDoListEntryState>,
    #[account(mut)]
    pub owner: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct UpdateEntry<'info> {
    #[account(mut, 
        seeds = [b"todo", owner.key().as_ref()], 
        bump, 
        has_one = owner @ ToDoError::Unauthorized)]
    pub to_do_list_entry: Account<'info, ToDoListEntryState>,

    #[account(mut)]
    pub owner: Signer<'info>,
}

#[derive(Accounts)]
pub struct AddItem<'info> {
    #[account(mut, 
        seeds = [b"todo", owner.key().as_ref()], 
        bump,
        has_one = owner @ ToDoError::Unauthorized )]
    pub to_do_list_entry: Account<'info, ToDoListEntryState>,

    #[account(mut)]
    pub owner: Signer<'info>,
}

#[derive(Accounts)]
pub struct RemoveItem<'info> {
    #[account(mut, 
        seeds = [b"todo", owner.key().as_ref()], 
        bump,
        has_one = owner @ ToDoError::Unauthorized,
        close = owner)]
    pub to_do_list_entry: Account<'info, ToDoListEntryState>,

    #[account(mut)]
    pub owner: Signer<'info>,
}

// State for the to-do list entry

#[account]
pub struct ToDoListEntryState {
    pub owner: Pubkey,
    pub list_item: Vec<String>,
}

// Custom error types for the program

#[error_code]
pub enum ToDoError {
    #[msg("The item is too long.")]
    ItemTooLong,
    #[msg("List is full. Max 50 items allowed.")]
    ListFull,
     #[msg("Only the owner can modify this to-do list.")]
    Unauthorized,
    #[msg("This item index is wrong.")]
    WrongIndex
}
