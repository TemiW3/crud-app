/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/todo_list.json`.
 */
export type TodoList = {
  "address": "5FGL1x4ZsJcV8MiiUh7HtBgJEomVFopRAX1GNbF3xxTv",
  "metadata": {
    "name": "todoList",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "addItemToToDoListEntry",
      "discriminator": [
        191,
        242,
        156,
        7,
        142,
        179,
        141,
        195
      ],
      "accounts": [
        {
          "name": "toDoListEntry",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  111,
                  100,
                  111
                ]
              },
              {
                "kind": "account",
                "path": "owner"
              }
            ]
          }
        },
        {
          "name": "owner",
          "writable": true,
          "signer": true,
          "relations": [
            "toDoListEntry"
          ]
        }
      ],
      "args": [
        {
          "name": "newItem",
          "type": {
            "defined": {
              "name": "task"
            }
          }
        }
      ]
    },
    {
      "name": "createToDoListEntry",
      "discriminator": [
        91,
        43,
        98,
        189,
        255,
        167,
        30,
        73
      ],
      "accounts": [
        {
          "name": "toDoListEntry",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  111,
                  100,
                  111
                ]
              },
              {
                "kind": "account",
                "path": "owner"
              }
            ]
          }
        },
        {
          "name": "owner",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "firstItem",
          "type": {
            "defined": {
              "name": "task"
            }
          }
        }
      ]
    },
    {
      "name": "removeItemFromToDoListEntry",
      "discriminator": [
        217,
        252,
        41,
        185,
        134,
        113,
        61,
        189
      ],
      "accounts": [
        {
          "name": "toDoListEntry",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  111,
                  100,
                  111
                ]
              },
              {
                "kind": "account",
                "path": "owner"
              }
            ]
          }
        },
        {
          "name": "owner",
          "writable": true,
          "signer": true,
          "relations": [
            "toDoListEntry"
          ]
        }
      ],
      "args": [
        {
          "name": "itemIndex",
          "type": "u32"
        }
      ]
    },
    {
      "name": "toggleStatus",
      "discriminator": [
        251,
        215,
        30,
        52,
        226,
        153,
        115,
        130
      ],
      "accounts": [
        {
          "name": "todoList",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  111,
                  100,
                  111
                ]
              },
              {
                "kind": "account",
                "path": "user"
              }
            ]
          }
        },
        {
          "name": "user",
          "writable": true,
          "signer": true
        }
      ],
      "args": [
        {
          "name": "index",
          "type": "u32"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "toDoListEntryState",
      "discriminator": [
        235,
        205,
        248,
        167,
        142,
        22,
        236,
        22
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "itemTooLong",
      "msg": "The item is too long."
    },
    {
      "code": 6001,
      "name": "listFull",
      "msg": "List is full. Max 50 items allowed."
    },
    {
      "code": 6002,
      "name": "unauthorized",
      "msg": "Only the owner can modify this to-do list."
    },
    {
      "code": 6003,
      "name": "wrongIndex",
      "msg": "This item index is wrong."
    }
  ],
  "types": [
    {
      "name": "task",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "listItem",
            "type": "string"
          },
          {
            "name": "isDone",
            "type": "bool"
          }
        ]
      }
    },
    {
      "name": "toDoListEntryState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "owner",
            "type": "pubkey"
          },
          {
            "name": "list",
            "type": {
              "vec": {
                "defined": {
                  "name": "task"
                }
              }
            }
          }
        ]
      }
    }
  ]
};
