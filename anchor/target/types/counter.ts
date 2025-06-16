/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/counter.json`.
 */
export type Counter = {
  "address": "FqzkXZdwYjurnUKetJCAvaUw5WAqbwzU6gZEwydeEfqS",
  "metadata": {
    "name": "counter",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
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
          "name": "listItem",
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
