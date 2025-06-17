#![allow(clippy::result_large_err)]
#![allow(unexpected_cfgs)]

use anchor_lang::prelude::*;

declare_id!("5FGL1x4ZsJcV8MiiUh7HtBgJEomVFopRAX1GNbF3xxTv");

#[program]
pub mod todo_list {
    use super::*;

    // The main entry point for the program
    // Instructions to create, update, add, and remove items from a to-do list entry

    pub fn create_to_do_list_entry(ctx: Context<CreateList>, first_item: Task) -> Result<()>{
        require!(first_item.list_item.len() <= 100, ToDoError::ItemTooLong);
        let to_do_list_entry = &mut ctx.accounts.to_do_list_entry;
        to_do_list_entry.owner = ctx.accounts.owner.key();
        to_do_list_entry.list= vec![first_item];

        Ok(())
    }

    pub fn toggle_status(ctx: Context<ToggleStatus>, index: u32) -> Result<()> {
        let todo = &mut ctx.accounts.todo_list;
        require_keys_eq!(ctx.accounts.user.key(), todo.owner, ToDoError::Unauthorized);

        let index = index as usize;
        require!(index < todo.list.len(), ToDoError::WrongIndex);

        let task = &mut todo.list[index];
        task.is_done = !task.is_done;

        Ok(())
    }


    pub fn add_item_to_to_do_list_entry(ctx: Context<AddItem>, new_item: Task) -> Result<()> {
        require!(new_item.list_item.len() <= 100, ToDoError::ItemTooLong);

        let to_do_list_entry = &mut ctx.accounts.to_do_list_entry;

        if to_do_list_entry.list.len() >= 50 {
            return Err(error!(ToDoError::ListFull));
        }

        to_do_list_entry.list.push(new_item);

        Ok(())
    }

    pub fn remove_item_from_to_do_list_entry(ctx: Context<AddItem>, item_index: u32) -> Result<()> {
        let to_do_list_entry = &mut ctx.accounts.to_do_list_entry;

        if item_index as usize >= to_do_list_entry.list.len() {
            return Err(error!(ToDoError::WrongIndex));
        }

        to_do_list_entry.list.remove(item_index as usize);

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
pub struct ToggleStatus<'info> {
    #[account(
        mut,
        seeds = [b"todo", user.key().as_ref()],
        bump
    )]
    pub todo_list: Account<'info, ToDoListEntryState>,
    
    #[account(mut)]
    pub user: Signer<'info>,
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
    pub list: Vec<Task>,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct Task {
    pub list_item: String,
    pub is_done: bool,
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
