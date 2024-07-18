/*  rich text editor example content  */
import { v4 as uuidv4 } from "uuid";
/*  article  */
import { Category, Tag, User } from "@/types.ts";

export const exampleContentHtml = '<h2 style="text-align: center">Hey there 👋</h2><p>This is a <em>basic</em> example of <code>mui-tiptap</code>, which combines <a target="_blank" rel="noopener noreferrer nofollow" href="https://tiptap.dev/">Tiptap</a> with customizable <a target="_blank" rel="noopener noreferrer nofollow" href="https://mui.com/">MUI (Material-UI)</a> styles, plus a suite of additional components and extensions! Sure, there are <strong>all <em>kinds</em> of <s>text</s> <u>formatting</u> options</strong> you’d probably expect from a rich text editor. But wait until you see the <span data-type="mention" data-id="15" data-label="Axl Rose">@Axl Rose</span> mentions and lists:</p><ul><li><p>That’s a bullet list with one …</p></li><li><p>… or two list items.</p></li></ul><p>Isn’t that great? And all of that is editable. <strong><span style="color: #ff9900">But wait, </span><span style="color: #403101"><mark data-color="#ffd699" style="background-color: #ffd699; color: inherit">there’s more!</mark></span></strong> Let’s try a code block:</p><pre><code class="language-css">body {\n  display: none;\n}</code></pre><p></p><p>That’s only the tip of the iceberg. Feel free to add and resize images:</p><img height="auto" src="https://picsum.photos/600/400" alt="random image" width="350" style="aspect-ratio: 3 / 2"><p></p><p>Organize information in tables:</p><table><tbody><tr><th colspan="1" rowspan="1"><p>Name</p></th><th colspan="1" rowspan="1"><p>Role</p></th><th colspan="1" rowspan="1"><p>Team</p></th></tr><tr><td colspan="1" rowspan="1"><p>Alice</p></td><td colspan="1" rowspan="1"><p>PM</p></td><td colspan="1" rowspan="1"><p>Internal tools</p></td></tr><tr><td colspan="1" rowspan="1"><p>Bob</p></td><td colspan="1" rowspan="1"><p>Software</p></td><td colspan="1" rowspan="1"><p>Infrastructure</p></td></tr></tbody></table><p></p><p>Or write down your groceries:</p><ul data-type="taskList"><li data-checked="true" data-type="taskItem"><label><input type="checkbox" checked="checked"><span></span></label><div><p>Milk</p></div></li><li data-checked="false" data-type="taskItem"><label><input type="checkbox"><span></span></label><div><p>Eggs</p></div></li><li data-checked="false" data-type="taskItem"><label><input type="checkbox"><span></span></label><div><p>Sriracha</p></div></li></ul><blockquote><p>Wow, that’s amazing. Good work! 👏 <br>— Mom</p></blockquote><p>Give it a try and click around!</p>';
export const exampleContentJson = {
  "type": "doc",
  "content": [
    {
      "type": "heading",
      "attrs": {
        "textAlign": "center",
        "level": 2
      },
      "content": [
        {
          "type": "text",
          "text": "Hey there 👋"
        }
      ]
    },
    {
      "type": "paragraph",
      "attrs": {
        "textAlign": "left"
      },
      "content": [
        {
          "type": "text",
          "text": "This is a "
        },
        {
          "type": "text",
          "marks": [
            {
              "type": "italic"
            }
          ],
          "text": "basic"
        },
        {
          "type": "text",
          "text": " example of "
        },
        {
          "type": "text",
          "marks": [
            {
              "type": "code"
            }
          ],
          "text": "mui-tiptap"
        },
        {
          "type": "text",
          "text": ", which combines "
        },
        {
          "type": "text",
          "marks": [
            {
              "type": "link",
              "attrs": {
                "href": "https://tiptap.dev/",
                "target": "_blank",
                "rel": "noopener noreferrer nofollow",
                "class": null
              }
            }
          ],
          "text": "Tiptap"
        },
        {
          "type": "text",
          "text": " with customizable "
        },
        {
          "type": "text",
          "marks": [
            {
              "type": "link",
              "attrs": {
                "href": "https://mui.com/",
                "target": "_blank",
                "rel": "noopener noreferrer nofollow",
                "class": null
              }
            }
          ],
          "text": "MUI (Material-UI)"
        },
        {
          "type": "text",
          "text": " styles, plus a suite of additional components and extensions! Sure, there are "
        },
        {
          "type": "text",
          "marks": [
            {
              "type": "bold"
            }
          ],
          "text": "all "
        },
        {
          "type": "text",
          "marks": [
            {
              "type": "bold"
            },
            {
              "type": "italic"
            }
          ],
          "text": "kinds"
        },
        {
          "type": "text",
          "marks": [
            {
              "type": "bold"
            }
          ],
          "text": " of "
        },
        {
          "type": "text",
          "marks": [
            {
              "type": "bold"
            },
            {
              "type": "strike"
            }
          ],
          "text": "text"
        },
        {
          "type": "text",
          "marks": [
            {
              "type": "bold"
            }
          ],
          "text": " "
        },
        {
          "type": "text",
          "marks": [
            {
              "type": "bold"
            },
            {
              "type": "underline"
            }
          ],
          "text": "formatting"
        },
        {
          "type": "text",
          "marks": [
            {
              "type": "bold"
            }
          ],
          "text": " options"
        },
        {
          "type": "text",
          "text": " you’d probably expect from a rich text editor. But wait until you see the "
        },
        {
          "type": "mention",
          "attrs": {
            "id": "15",
            "label": "Axl Rose"
          }
        },
        {
          "type": "text",
          "text": " mentions and lists:"
        }
      ]
    },
    {
      "type": "bulletList",
      "content": [
        {
          "type": "listItem",
          "content": [
            {
              "type": "paragraph",
              "attrs": {
                "textAlign": "left"
              },
              "content": [
                {
                  "type": "text",
                  "text": "That’s a bullet list with one …"
                }
              ]
            }
          ]
        },
        {
          "type": "listItem",
          "content": [
            {
              "type": "paragraph",
              "attrs": {
                "textAlign": "left"
              },
              "content": [
                {
                  "type": "text",
                  "text": "… or two list items."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "attrs": {
        "textAlign": "left"
      },
      "content": [
        {
          "type": "text",
          "text": "Isn’t that great? And all of that is editable. "
        },
        {
          "type": "text",
          "marks": [
            {
              "type": "bold"
            },
            {
              "type": "textStyle",
              "attrs": {
                "color": "rgb(255, 153, 0)",
                "fontFamily": "",
                "fontSize": ""
              }
            }
          ],
          "text": "But wait, "
        },
        {
          "type": "text",
          "marks": [
            {
              "type": "bold"
            },
            {
              "type": "textStyle",
              "attrs": {
                "color": "rgb(64, 49, 1)",
                "fontFamily": "",
                "fontSize": ""
              }
            },
            {
              "type": "highlight",
              "attrs": {
                "color": "#ffd699"
              }
            }
          ],
          "text": "there’s more!"
        },
        {
          "type": "text",
          "text": " Let’s try a code block:"
        }
      ]
    },
    {
      "type": "codeBlock",
      "attrs": {
        "language": "css"
      },
      "content": [
        {
          "type": "text",
          "text": "body {\n  display: none;\n}"
        }
      ]
    },
    {
      "type": "paragraph",
      "attrs": {
        "textAlign": "left"
      }
    },
    {
      "type": "paragraph",
      "attrs": {
        "textAlign": "left"
      },
      "content": [
        {
          "type": "text",
          "text": "That’s only the tip of the iceberg. Feel free to add and resize images:"
        }
      ]
    },
    {
      "type": "image",
      "attrs": {
        "textAlign": "left",
        "src": "https://picsum.photos/600/400",
        "alt": "random image",
        "title": null,
        "width": "350",
        "aspectRatio": "3 / 2"
      }
    },
    {
      "type": "paragraph",
      "attrs": {
        "textAlign": "left"
      }
    },
    {
      "type": "paragraph",
      "attrs": {
        "textAlign": "left"
      },
      "content": [
        {
          "type": "text",
          "text": "Organize information in tables:"
        }
      ]
    },
    {
      "type": "table",
      "content": [
        {
          "type": "tableRow",
          "content": [
            {
              "type": "tableHeader",
              "attrs": {
                "colspan": 1,
                "rowspan": 1,
                "colwidth": null
              },
              "content": [
                {
                  "type": "paragraph",
                  "attrs": {
                    "textAlign": "left"
                  },
                  "content": [
                    {
                      "type": "text",
                      "text": "Name"
                    }
                  ]
                }
              ]
            },
            {
              "type": "tableHeader",
              "attrs": {
                "colspan": 1,
                "rowspan": 1,
                "colwidth": null
              },
              "content": [
                {
                  "type": "paragraph",
                  "attrs": {
                    "textAlign": "left"
                  },
                  "content": [
                    {
                      "type": "text",
                      "text": "Role"
                    }
                  ]
                }
              ]
            },
            {
              "type": "tableHeader",
              "attrs": {
                "colspan": 1,
                "rowspan": 1,
                "colwidth": null
              },
              "content": [
                {
                  "type": "paragraph",
                  "attrs": {
                    "textAlign": "left"
                  },
                  "content": [
                    {
                      "type": "text",
                      "text": "Team"
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "type": "tableRow",
          "content": [
            {
              "type": "tableCell",
              "attrs": {
                "colspan": 1,
                "rowspan": 1,
                "colwidth": null
              },
              "content": [
                {
                  "type": "paragraph",
                  "attrs": {
                    "textAlign": "left"
                  },
                  "content": [
                    {
                      "type": "text",
                      "text": "Alice"
                    }
                  ]
                }
              ]
            },
            {
              "type": "tableCell",
              "attrs": {
                "colspan": 1,
                "rowspan": 1,
                "colwidth": null
              },
              "content": [
                {
                  "type": "paragraph",
                  "attrs": {
                    "textAlign": "left"
                  },
                  "content": [
                    {
                      "type": "text",
                      "text": "PM"
                    }
                  ]
                }
              ]
            },
            {
              "type": "tableCell",
              "attrs": {
                "colspan": 1,
                "rowspan": 1,
                "colwidth": null
              },
              "content": [
                {
                  "type": "paragraph",
                  "attrs": {
                    "textAlign": "left"
                  },
                  "content": [
                    {
                      "type": "text",
                      "text": "Internal tools"
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "type": "tableRow",
          "content": [
            {
              "type": "tableCell",
              "attrs": {
                "colspan": 1,
                "rowspan": 1,
                "colwidth": null
              },
              "content": [
                {
                  "type": "paragraph",
                  "attrs": {
                    "textAlign": "left"
                  },
                  "content": [
                    {
                      "type": "text",
                      "text": "Bob"
                    }
                  ]
                }
              ]
            },
            {
              "type": "tableCell",
              "attrs": {
                "colspan": 1,
                "rowspan": 1,
                "colwidth": null
              },
              "content": [
                {
                  "type": "paragraph",
                  "attrs": {
                    "textAlign": "left"
                  },
                  "content": [
                    {
                      "type": "text",
                      "text": "Software"
                    }
                  ]
                }
              ]
            },
            {
              "type": "tableCell",
              "attrs": {
                "colspan": 1,
                "rowspan": 1,
                "colwidth": null
              },
              "content": [
                {
                  "type": "paragraph",
                  "attrs": {
                    "textAlign": "left"
                  },
                  "content": [
                    {
                      "type": "text",
                      "text": "Infrastructure"
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "attrs": {
        "textAlign": "left"
      }
    },
    {
      "type": "paragraph",
      "attrs": {
        "textAlign": "left"
      },
      "content": [
        {
          "type": "text",
          "text": "Or write down your groceries:"
        }
      ]
    },
    {
      "type": "taskList",
      "content": [
        {
          "type": "taskItem",
          "attrs": {
            "checked": true
          },
          "content": [
            {
              "type": "paragraph",
              "attrs": {
                "textAlign": "left"
              },
              "content": [
                {
                  "type": "text",
                  "text": "Milk"
                }
              ]
            }
          ]
        },
        {
          "type": "taskItem",
          "attrs": {
            "checked": false
          },
          "content": [
            {
              "type": "paragraph",
              "attrs": {
                "textAlign": "left"
              },
              "content": [
                {
                  "type": "text",
                  "text": "Eggs"
                }
              ]
            }
          ]
        },
        {
          "type": "taskItem",
          "attrs": {
            "checked": false
          },
          "content": [
            {
              "type": "paragraph",
              "attrs": {
                "textAlign": "left"
              },
              "content": [
                {
                  "type": "text",
                  "text": "Sriracha"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "type": "blockquote",
      "content": [
        {
          "type": "paragraph",
          "attrs": {
            "textAlign": "left"
          },
          "content": [
            {
              "type": "text",
              "text": "Wow, that’s amazing. Good work! 👏 "
            },
            {
              "type": "hardBreak"
            },
            {
              "type": "text",
              "text": "— Mom"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "attrs": {
        "textAlign": "left"
      },
      "content": [
        {
          "type": "text",
          "text": "Give it a try and click around!"
        }
      ]
    }
  ]
};

/*  tag list  */
export const tags: Array<Tag> = [
  { id: "1", name: "quant" },
  { id: "2", name: "kmt model" },
  { id: "3", name: "machine learning" },
  { id: "4", name: "data analysis" },
  { id: "5", name: "trading algorithms" },
  { id: "6", name: "financial modeling" },
  { id: "7", name: "risk management" },
  { id: "8", name: "portfolio optimization" },
  { id: "9", name: "big data" },
  { id: "10", name: "deep learning" },
  { id: "11", name: "time series analysis" },
  { id: "12", name: "market prediction" },
  { id: "13", name: "asset allocation" },
  { id: "14", name: "stock analysis" },
  { id: "15", name: "economic indicators" },
  { id: "16", name: "financial engineering" },
  { id: "17", name: "backtesting" },
  { id: "18", name: "investment strategies" },
  { id: "19", name: "algorithmic trading" },
  { id: "20", name: "quantitative finance" },
  { id: "21", name: "hedge funds" },
  { id: "22", name: "derivatives" }
];

export const categories: Array<Category> = [
  { id: "1", name: "Trading" },
  { id: "2", name: "Cryptocurrency" },
  { id: "23", name: "high-frequency trading" },
  { id: "24", name: "statistical arbitrage" },
  { id: "25", name: "options pricing" },
  { id: "26", name: "market microstructure" },
  { id: "27", name: "volatility modeling" },
  { id: "28", name: "sentiment analysis" },
  { id: "29", name: "financial econometrics" },
  { id: "30", name: "credit risk modeling" },
  { id: "31", name: "algorithm development" },
  { id: "32", name: "technical analysis" },
  { id: "33", name: "order execution" },
  { id: "34", name: "liquidity management" },
  { id: "35", name: "quantitative research" },
  { id: "36", name: "risk assessment" },
  { id: "37", name: "fundamental analysis" },
  { id: "38", name: "derivative instruments" },
  { id: "39", name: "currency trading" },
  { id: "40", name: "interest rate modeling" },
  { id: "41", name: "blockchain technology" },
  { id: "42", name: "cryptocurrency trading" }
];

/*  user  */
export const exampleUser: User = {
  id: uuidv4(),
  username: "Disco Broccoli",
  password: "1234",
  email: "example@qq.com",
  phoneNumber: "1234567859",
  joinedDatetime: new Date(Date.now() - 1000 * 60 * 60 * 24 * 12),
  role: "Admin",
  avatarLink: undefined
}
