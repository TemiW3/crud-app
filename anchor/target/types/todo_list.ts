/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/todo_list.json`.
 */
export type TodoList = {
  "address": "FqzkXZdwYjurnUKetJCAvaUw5WAqbwzU6gZEwydeEfqS",
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
          "type": "string"
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
          "type": "string"
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
      "name": "updateToDoListEntry",
      "discriminator": [
        75,
        235,
        6,
        133,
        22,
        172,
        156,
        198
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
        },
        {
          "name": "newItem",
          "type": "string"
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
      "name": "toDoListEntryState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "owner",
            "type": "pubkey"
          },
          {
            "name": "listItem",
            "type": {
              "vec": "string"
            }
          }
        ]
      }
    }
  ]
};
