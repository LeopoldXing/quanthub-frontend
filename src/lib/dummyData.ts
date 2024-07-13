/*  rich text editor example content  */
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

/*  article  */
import { CompleteArticleData, ArticleOverviewInfo, Category, Tag } from "@/types.ts";

export const fakeCompleteArticles: Array<CompleteArticleData> = [
  {
    id: "1",
    title: "Quantitative Trading Strategies for US Stocks",
    subtitle: "An Introduction",
    tags: [{ id: "1", name: "quant" }, { id: "2", name: "US stocks" }],
    category: { id: "1", name: "Trading" },
    contentHtml: exampleContentHtml,
    author: { id: "1", username: "Quant Guru", role: "admin" },
    coverImageLink: undefined,
    rate: 8.5,
    comments: [],
    likes: "150",
    views: "1024",
    publishTimestamp: BigInt(Date.now() - 7 * 24 * 60 * 60 * 1000), // 1 week ago
    updateTimestamp: BigInt(Date.now() - 4 * 24 * 60 * 60 * 1000), // 4 days ago
    publishTillToday: "1 week ago",
    updateTillToday: "4 days ago"
  },
  {
    id: "2",
    title: "Machine Learning Applications in Bitcoin Trading",
    subtitle: "Using AI to Enhance Trading Strategies",
    tags: [{ id: "3", name: "machine learning" }, { id: "4", name: "Bitcoin" }],
    category: { id: "2", name: "Cryptocurrency" },
    contentHtml: `
      <h1>Machine Learning Applications in Bitcoin Trading</h1>
      <h2>Using AI to Enhance Trading Strategies</h2>
      <p>
        The use of machine learning in trading has grown significantly in recent years. This article explores how machine 
        learning algorithms can be applied to Bitcoin trading to enhance trading strategies and improve returns. 
        Machine learning models can analyze large datasets to identify patterns and make predictions about future price 
        movements. These models can be used for various trading strategies, including predictive modeling, sentiment 
        analysis, and anomaly detection.
      </p>
      <h3>Predictive Modeling</h3>
      <p>
        Predictive modeling involves using historical data to make predictions about future events. In the context of 
        Bitcoin trading, predictive models can forecast future price movements based on past price data. These models 
        use statistical techniques and machine learning algorithms, such as regression analysis and neural networks, 
        to identify patterns in the data. Traders can use these predictions to inform their trading decisions, such 
        as when to buy or sell Bitcoin.
      </p>
      <h3>Sentiment Analysis</h3>
      <p>
        Sentiment analysis is another powerful application of machine learning in Bitcoin trading. This technique 
        involves analyzing social media posts, news articles, and other text data to gauge market sentiment. Machine 
        learning algorithms, particularly those in the field of natural language processing (NLP), can process and 
        analyze vast amounts of text data to determine whether the sentiment is positive, negative, or neutral. Traders 
        can use this information to make informed decisions about market trends and potential price movements.
      </p>
      <h3>Anomaly Detection</h3>
      <p>
        Anomaly detection involves identifying unusual patterns in the data that may indicate potential trading 
        opportunities. Machine learning algorithms can be trained to recognize normal trading patterns and detect 
        anomalies that deviate from these patterns. For example, a sudden spike in trading volume or a significant 
        price movement that is not explained by historical trends may be flagged as an anomaly. Traders can investigate 
        these anomalies to determine whether they represent potential trading opportunities or risks.
      </p>
      <h3>Conclusion</h3>
      <p>
        Machine learning applications in Bitcoin trading offer powerful tools for enhancing trading strategies. 
        Predictive modeling, sentiment analysis, and anomaly detection are just a few of the ways that machine learning 
        can be used to analyze market data and inform trading decisions. As the field of machine learning continues 
        to evolve, it is likely that new applications and techniques will emerge, providing traders with even more 
        sophisticated tools for navigating the complex world of cryptocurrency trading. However, it is important to 
        note that machine learning models are not infallible, and traders should use them in conjunction with other 
        analysis techniques and risk management strategies.
      </p>
    `,
    author: { id: "2", username: "ML Trader", role: "registeredUser" },
    coverImageLink: undefined,
    rate: 9.3,
    comments: [],
    likes: "200",
    views: "1345",
    publishTimestamp: BigInt(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10 days ago
    updateTimestamp: BigInt(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    publishTillToday: "10 days ago",
    updateTillToday: "3 days ago"
  },
  {
    id: "3",
    title: "Risk Management in Bitcoin Trading",
    subtitle: "Strategies to Minimize Risks",
    tags: [{ id: "7", name: "risk management" }, { id: "4", name: "Bitcoin" }],
    category: { id: "2", name: "Cryptocurrency" },
    contentHtml: `
      <h1>Risk Management in Bitcoin Trading</h1>
      <h2>Strategies to Minimize Risks</h2>
      <p>
        Risk management is crucial in any trading strategy, and Bitcoin trading is no exception. This article discusses 
        various risk management techniques that can be applied to Bitcoin trading to minimize potential losses. Effective 
        risk management involves identifying, assessing, and mitigating risks to protect your investment portfolio. 
        By implementing these strategies, traders can reduce the impact of market volatility and enhance their overall 
        trading performance.
      </p>
      <h3>Position Sizing</h3>
      <p>
        Position sizing is a fundamental risk management technique that involves determining the appropriate amount 
        of capital to allocate to each trade. By limiting the size of each position, traders can control their exposure 
        to potential losses. A common approach to position sizing is the "fixed percentage" method, where traders risk 
        a fixed percentage of their total capital on each trade. This method helps to ensure that no single trade can 
        significantly impact the overall portfolio.
      </p>
      <h3>Stop-Loss Orders</h3>
      <p>
        Stop-loss orders are an essential tool for managing risk in Bitcoin trading. A stop-loss order is an order 
        placed with a broker to buy or sell a security when it reaches a certain price. This order helps to limit 
        potential losses by automatically closing a position if the price moves against the trader. By setting stop-loss 
        orders, traders can protect their capital and avoid significant losses in volatile markets.
      </p>
      <h3>Diversification</h3>
      <p>
        Diversification involves spreading investments across different assets to reduce risk. In the context of Bitcoin 
        trading, diversification can mean holding a mix of cryptocurrencies and other asset classes. By diversifying 
        their portfolios, traders can mitigate the impact of a poor-performing asset on their overall returns. 
        Diversification is a key principle of modern portfolio theory and is widely used by investors to manage risk.
      </p>
      <h3>Hedging</h3>
      <p>
        Hedging is a risk management strategy that involves taking offsetting positions to reduce exposure to market 
        volatility. In Bitcoin trading, traders can use derivatives, such as futures and options, to hedge their positions. 
        For example, a trader holding a long position in Bitcoin can buy put options to protect against a decline in the 
        price of Bitcoin. Hedging can help to stabilize returns and reduce the impact of adverse market movements.
      </p>
      <h3>Conclusion</h3>
      <p>
        Risk management is an integral part of successful Bitcoin trading. By implementing strategies such as position 
        sizing, stop-loss orders, diversification, and hedging, traders can minimize potential losses and protect their 
        investment portfolios. Effective risk management requires a disciplined approach and a thorough understanding 
        of market dynamics. As the cryptocurrency market continues to evolve, traders should continuously review and 
        update their risk management strategies to adapt to changing conditions.
      </p>
    `,
    author: { id: "3", username: "Risk Master", role: "admin" },
    coverImageLink: "https://example.com/image3.jpg",
    rate: 7.8,
    comments: [],
    likes: "120",
    views: "987",
    publishTimestamp: BigInt(Date.now() - 15 * 24 * 60 * 60 * 1000), // 15 days ago
    updateTimestamp: BigInt(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    publishTillToday: "15 days ago",
    updateTillToday: "5 days ago"
  },
  {
    id: "4",
    title: "Building a Quantitative Trading System for US Stocks",
    subtitle: "Step-by-Step Guide",
    tags: [{ id: "1", name: "quant" }, { id: "2", name: "US stocks" }],
    category: { id: "1", name: "Trading" },
    contentHtml: `
      <h1>Building a Quantitative Trading System for US Stocks</h1>
      <h2>Step-by-Step Guide</h2>
      <p>
        Creating a quantitative trading system for US stocks can be a complex process. This step-by-step guide walks 
        you through the process of building and implementing a robust trading system. Quantitative trading systems use 
        mathematical models and algorithms to analyze market data and make trading decisions. These systems aim to 
        remove human emotions from trading, providing a systematic approach to the stock market.
      </p>
      <h3>Step 1: Define Your Trading Strategy</h3>
      <p>
        The first step in building a quantitative trading system is to define your trading strategy. This involves 
        identifying the market conditions under which your system will trade and the specific criteria for entering 
        and exiting trades. Your strategy should be based on a thorough analysis of historical data and a clear 
        understanding of market dynamics. Common strategies include mean-reversion, momentum trading, and statistical 
        arbitrage.
      </p>
      <h3>Step 2: Collect and Clean Data</h3>
      <p>
        Data is the backbone of any quantitative trading system. To build a robust system, you need access to 
        high-quality historical and real-time data. This includes price data, volume data, and other relevant market 
        indicators. Once you have collected the data, it is important to clean and preprocess it to remove any errors 
        or inconsistencies. This may involve filling in missing values, adjusting for corporate actions, and normalizing 
        the data.
      </p>
      <h3>Step 3: Develop the Trading Algorithm</h3>
      <p>
        The trading algorithm is the core component of your quantitative trading system. This algorithm analyzes market 
        data and generates trading signals based on your defined strategy. Developing the algorithm involves writing 
        code to implement the trading logic and testing it on historical data to evaluate its performance. It is 
        important to use robust statistical methods and backtesting techniques to ensure that your algorithm is reliable 
        and effective.
      </p>
      <h3>Step 4: Implement Risk Management</h3>
      <p>
        Risk management is a critical aspect of any trading system. This involves setting rules for position sizing, 
        stop-loss orders, and portfolio diversification to protect your capital. Effective risk management helps to 
        minimize potential losses and stabilize returns. It is important to regularly review and update your risk 
        management rules based on market conditions and your trading performance.
      </p>
      <h3>Step 5: Backtest and Optimize</h3>
      <p>
        Backtesting involves testing your trading algorithm on historical data to evaluate its performance. This helps 
        to identify any weaknesses in your strategy and make necessary adjustments. Optimization involves fine-tuning 
        the parameters of your algorithm to improve its performance. However, it is important to avoid overfitting, 
        which can result in poor performance on out-of-sample data.
      </p>
      <h3>Step 6: Deploy and Monitor</h3>
      <p>
        Once you are satisfied with the performance of your trading algorithm, the final step is to deploy it in a live 
        trading environment. This involves integrating your algorithm with a trading platform and executing trades 
        based on real-time market data. It is important to continuously monitor the performance of your system and make 
        necessary adjustments to adapt to changing market conditions.
      </p>
      <h3>Conclusion</h3>
      <p>
        Building a quantitative trading system for US stocks involves a systematic process of defining your strategy, 
        collecting and cleaning data, developing the trading algorithm, implementing risk management, backtesting and 
        optimizing, and deploying and monitoring the system. By following these steps, you can create a robust and 
        reliable trading system that leverages mathematical models and algorithms to make data-driven trading decisions. 
        However, it is important to remember that no trading system is infallible, and continuous monitoring and adjustment 
        are essential for long-term success.
      </p>
    `,
    author: { id: "4", username: "System Builder", role: "registeredUser" },
    coverImageLink: undefined,
    rate: 8.9,
    comments: [],
    likes: "140",
    views: "1123",
    publishTimestamp: BigInt(Date.now() - 12 * 24 * 60 * 60 * 1000), // 12 days ago
    updateTimestamp: BigInt(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    publishTillToday: "12 days ago",
    updateTillToday: "2 days ago"
  },
  {
    id: "5",
    title: "Quantitative Trading Strategies for Bitcoin",
    subtitle: "Popular Strategies Explained",
    tags: [{ id: "1", name: "quant" }, { id: "4", name: "Bitcoin" }],
    category: { id: "2", name: "Cryptocurrency" },
    contentHtml: `
      <h1>Quantitative Trading Strategies for Bitcoin</h1>
      <h2>Popular Strategies Explained</h2>
      <p>
        Bitcoin trading can benefit greatly from quantitative strategies. This article provides an overview of some 
        popular quantitative trading strategies specifically designed for Bitcoin. These strategies leverage mathematical 
        models and algorithms to analyze market data and make trading decisions. By using quantitative techniques, 
        traders can remove emotions from trading and adopt a systematic approach to the volatile cryptocurrency market.
      </p>
      <h3>Mean Reversion</h3>
      <p>
        Mean reversion is a popular quantitative trading strategy that assumes that the price of Bitcoin will revert 
        to its mean or average price over time. This strategy involves identifying overbought or oversold conditions 
        and taking positions accordingly. For example, if Bitcoin is trading significantly above its historical average, 
        a mean reversion strategy would involve taking a short position, expecting the price to decline. Conversely, 
        if Bitcoin is trading below its historical average, the strategy would involve taking a long position, expecting 
        the price to rise.
      </p>
      <h3>Momentum Trading</h3>
      <p>
        Momentum trading is another popular quantitative strategy that involves buying assets that have shown upward 
        price trends and selling those that have shown downward trends. The basic premise is that assets that have 
        performed well in the past will continue to perform well in the future. Momentum traders use technical indicators, 
        such as moving averages and relative strength index (RSI), to identify trends and make trading decisions. This 
        strategy requires a disciplined approach to manage risk, as market trends can change rapidly.
      </p>
      <h3>Arbitrage</h3>
      <p>
        Arbitrage involves taking advantage of price differences between different markets or exchanges. In the context 
        of Bitcoin trading, arbitrage opportunities may arise when the price of Bitcoin varies between different 
        cryptocurrency exchanges. Traders can buy Bitcoin on the exchange where the price is lower and sell it on the 
        exchange where the price is higher, profiting from the price difference. Arbitrage strategies require fast 
        execution and access to multiple exchanges to be effective.
      </p>
      <h3>Machine Learning Models</h3>
      <p>
        Machine learning models are increasingly being used in quantitative trading strategies for Bitcoin. These 
        models can analyze large datasets to identify patterns and make predictions about future price movements. 
        Popular machine learning techniques in trading include regression analysis, neural networks, and reinforcement 
        learning. These models can be trained on historical price data and other relevant market indicators to generate 
        trading signals.
      </p>
      <h3>Conclusion</h3>
      <p>
        Quantitative trading strategies for Bitcoin provide a systematic approach to trading, leveraging mathematical 
        models and algorithms to make data-driven decisions. Whether using mean reversion, momentum trading, arbitrage, 
        or machine learning models, these strategies aim to exploit market inefficiencies and generate consistent returns. 
        However, it is important to remember that quantitative trading also involves risks, and it requires rigorous 
        testing and validation to ensure the robustness of the models. As technology continues to advance, quantitative 
        trading will likely play an increasingly significant role in the cryptocurrency markets.
      </p>
    `,
    author: { id: "5", username: "Strategy Guru", role: "admin" },
    coverImageLink: "https://example.com/image5.jpg",
    rate: 9.6,
    comments: [],
    likes: "175",
    views: "1420",
    publishTimestamp: BigInt(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    updateTimestamp: BigInt(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    publishTillToday: "5 days ago",
    updateTillToday: "1 day ago"
  }
];


export const fakeArticleOverviewList: Array<ArticleOverviewInfo> = [
  {
    id: "1",
    title: "Quantitative Trading Strategies for US Stocks",
    subtitle: "An Introduction",
    tags: [{ id: "1", name: "quant" }, { id: "2", name: "US stocks" }],
    category: { id: "1", name: "Trading" },
    description: "Quantitative trading involves using mathematical models and algorithms to make trading decisions. In this article, we will explore some popular quantitative trading strategies that are used for trading US stocks...",
    author: { id: "1", username: "Quant Guru", role: "admin" },
    coverImageLink: undefined,
    rate: 8.5,
    commentsCount: 23,
    likes: "150",
    views: "1024",
    publishTimestamp: BigInt(Date.now() - 7 * 24 * 60 * 60 * 1000), // 1 week ago
    updateTimestamp: BigInt(Date.now() - 4 * 24 * 60 * 60 * 1000), // 4 days ago
    publishTillToday: "1 week ago",
    updateTillToday: "4 days ago"
  },
  {
    id: "2",
    title: "Machine Learning Applications in Bitcoin Trading",
    subtitle: "Using AI to Enhance Trading Strategies",
    tags: [{ id: "3", name: "machine learning" }, { id: "4", name: "Bitcoin" }],
    category: { id: "2", name: "Cryptocurrency" },
    description: "The use of machine learning in trading has grown significantly in recent years. This article explores how machine learning algorithms can be applied to Bitcoin trading to enhance trading strategies and improve returns...",
    author: { id: "2", username: "ML Trader", role: "registeredUser" },
    coverImageLink: undefined,
    rate: 9.3,
    commentsCount: 34,
    likes: "200",
    views: "1345",
    publishTimestamp: BigInt(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10 days ago
    updateTimestamp: BigInt(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    publishTillToday: "10 days ago",
    updateTillToday: "3 days ago"
  },
  {
    id: "3",
    title: "Risk Management in Bitcoin Trading",
    subtitle: "Strategies to Minimize Risks",
    tags: [{ id: "7", name: "risk management" }, { id: "4", name: "Bitcoin" }],
    category: { id: "2", name: "Cryptocurrency" },
    description: "Risk management is crucial in any trading strategy, and Bitcoin trading is no exception. This article discusses various risk management techniques that can be applied to Bitcoin trading to minimize potential losses...",
    author: { id: "3", username: "Risk Master", role: "admin" },
    coverImageLink: "https://example.com/image3.jpg",
    rate: 7.8,
    commentsCount: 12,
    likes: "120",
    views: "987",
    publishTimestamp: BigInt(Date.now() - 15 * 24 * 60 * 60 * 1000), // 15 days ago
    updateTimestamp: BigInt(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    publishTillToday: "15 days ago",
    updateTillToday: "5 days ago"
  },
  {
    id: "4",
    title: "Building a Quantitative Trading System for US Stocks",
    subtitle: "Step-by-Step Guide",
    tags: [{ id: "1", name: "quant" }, { id: "2", name: "US stocks" }],
    category: { id: "1", name: "Trading" },
    description: "Creating a quantitative trading system for US stocks can be a complex process. This step-by-step guide walks you through the process of building and implementing a robust trading system...",
    author: { id: "4", username: "System Builder", role: "registeredUser" },
    coverImageLink: undefined,
    rate: 8.9,
    commentsCount: 18,
    likes: "140",
    views: "1123",
    publishTimestamp: BigInt(Date.now() - 12 * 24 * 60 * 60 * 1000), // 12 days ago
    updateTimestamp: BigInt(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    publishTillToday: "12 days ago",
    updateTillToday: "2 days ago"
  },
  {
    id: "5",
    title: "Quantitative Trading Strategies for Bitcoin",
    subtitle: "Popular Strategies Explained",
    tags: [{ id: "1", name: "quant" }, { id: "4", name: "Bitcoin" }],
    category: { id: "2", name: "Cryptocurrency" },
    description: "Bitcoin trading can benefit greatly from quantitative strategies. This article provides an overview of some popular quantitative trading strategies specifically designed for Bitcoin...",
    author: { id: "5", username: "Strategy Guru", role: "admin" },
    coverImageLink: "https://example.com/image5.jpg",
    rate: 9.6,
    commentsCount: 27,
    likes: "175",
    views: "1420",
    publishTimestamp: BigInt(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    updateTimestamp: BigInt(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    publishTillToday: "5 days ago",
    updateTillToday: "1 day ago"
  },
  {
    id: "6",
    title: "Time Series Analysis for US Stocks",
    subtitle: "Techniques and Applications",
    tags: [{ id: "11", name: "time series analysis" }, { id: "2", name: "US stocks" }],
    category: { id: "1", name: "Trading" },
    description: "Time series analysis is a powerful tool in the arsenal of a quantitative trader. This article explores various techniques of time series analysis and their applications in trading US stocks...",
    author: { id: "6", username: "Time Series Pro", role: "registeredUser" },
    coverImageLink: "https://example.com/image6.jpg",
    rate: 8.2,
    commentsCount: 15,
    likes: "130",
    views: "1010",
    publishTimestamp: BigInt(Date.now() - 20 * 24 * 60 * 60 * 1000), // 20 days ago
    updateTimestamp: BigInt(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10 days ago
    publishTillToday: "20 days ago",
    updateTillToday: "10 days ago"
  },
  {
    id: "7",
    title: "Algorithmic Trading with Python for Bitcoin",
    subtitle: "Implementing Algorithms in Python",
    tags: [{ id: "19", name: "algorithmic trading" }, { id: "4", name: "Bitcoin" }],
    category: { id: "2", name: "Cryptocurrency" },
    description: "Python is a popular programming language for implementing trading algorithms. This article focuses on how to use Python to develop and implement trading algorithms for Bitcoin...",
    author: { id: "7", username: "Python Trader", role: "admin" },
    coverImageLink: "https://example.com/image7.jpg",
    rate: 9.8,
    commentsCount: 40,
    likes: "210",
    views: "1600",
    publishTimestamp: BigInt(Date.now() - 6 * 24 * 60 * 60 * 1000), // 6 days ago
    updateTimestamp: BigInt(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    publishTillToday: "6 days ago",
    updateTillToday: "3 days ago"
  },
  {
    id: "8",
    title: "Backtesting Bitcoin Trading Strategies",
    subtitle: "How to Backtest Your Strategies",
    tags: [{ id: "17", name: "backtesting" }, { id: "4", name: "Bitcoin" }],
    category: { id: "2", name: "Cryptocurrency" },
    description: "Backtesting is a critical step in developing a successful trading strategy. This article provides a detailed guide on how to backtest Bitcoin trading strategies effectively...",
    author: { id: "8", username: "Backtest Master", role: "registeredUser" },
    coverImageLink: "https://example.com/image8.jpg",
    rate: 7.5,
    commentsCount: 10,
    likes: "110",
    views: "980",
    publishTimestamp: BigInt(Date.now() - 8 * 24 * 60 * 60 * 1000), // 8 days ago
    updateTimestamp: BigInt(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    publishTillToday: "8 days ago",
    updateTillToday: "2 days ago"
  },
  {
    id: "9",
    title: "Portfolio Optimization Techniques for US Stocks",
    subtitle: "Maximizing Returns, Minimizing Risks",
    tags: [{ id: "8", name: "portfolio optimization" }, { id: "2", name: "US stocks" }],
    category: { id: "1", name: "Trading" },
    description: "Optimizing your portfolio is key to maximizing returns while minimizing risks. This article discusses various techniques for portfolio optimization when trading US stocks...",
    author: { id: "9", username: "Portfolio Guru", role: "admin" },
    coverImageLink: "https://example.com/image9.jpg",
    rate: 8.6,
    commentsCount: 20,
    likes: "145",
    views: "1100",
    publishTimestamp: BigInt(Date.now() - 14 * 24 * 60 * 60 * 1000), // 14 days ago
    updateTimestamp: BigInt(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    publishTillToday: "14 days ago",
    updateTillToday: "5 days ago"
  },
  {
    id: "10",
    title: "Leveraging Big Data for Trading US Stocks",
    subtitle: "Enhancing Trading Strategies",
    tags: [{ id: "9", name: "big data" }, { id: "2", name: "US stocks" }],
    category: { id: "1", name: "Trading" },
    description: "Big data analytics has revolutionized many industries, including trading. This article explores how big data can be leveraged to enhance trading strategies for US stocks...",
    author: { id: "10", username: "Data Scientist", role: "registeredUser" },
    coverImageLink: "https://example.com/image10.jpg",
    rate: 9.1,
    commentsCount: 25,
    likes: "160",
    views: "1200",
    publishTimestamp: BigInt(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    updateTimestamp: BigInt(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    publishTillToday: "3 days ago",
    updateTillToday: "1 day ago"
  },
  {
    id: "11",
    title: "High-Frequency Trading in US Stocks",
    subtitle: "An In-depth Look",
    tags: [{ id: "23", name: "high-frequency trading" }, { id: "2", name: "US stocks" }],
    category: { id: "1", name: "Trading" },
    description: "High-frequency trading (HFT) is a complex and highly competitive area of trading. This article provides an in-depth look at HFT in the context of US stock trading...",
    author: { id: "11", username: "HFT Expert", role: "admin" },
    coverImageLink: "https://example.com/image11.jpg",
    rate: 8.4,
    commentsCount: 30,
    likes: "170",
    views: "1300",
    publishTimestamp: BigInt(Date.now() - 21 * 24 * 60 * 60 * 1000), // 21 days ago
    updateTimestamp: BigInt(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10 days ago
    publishTillToday: "21 days ago",
    updateTillToday: "10 days ago"
  },
  {
    id: "12",
    title: "Statistical Arbitrage in Bitcoin Trading",
    subtitle: "Profiting from Market Inefficiencies",
    tags: [{ id: "24", name: "statistical arbitrage" }, { id: "4", name: "Bitcoin" }],
    category: { id: "2", name: "Cryptocurrency" },
    description: "Statistical arbitrage involves using statistical methods to exploit market inefficiencies. This article discusses how statistical arbitrage strategies can be applied to Bitcoin trading...",
    author: { id: "12", username: "Stat Arb Guru", role: "registeredUser" },
    coverImageLink: "https://example.com/image12.jpg",
    rate: 8.7,
    commentsCount: 22,
    likes: "150",
    views: "1150",
    publishTimestamp: BigInt(Date.now() - 11 * 24 * 60 * 60 * 1000), // 11 days ago
    updateTimestamp: BigInt(Date.now() - 6 * 24 * 60 * 60 * 1000), // 6 days ago
    publishTillToday: "11 days ago",
    updateTillToday: "6 days ago"
  },
  {
    id: "13",
    title: "Sentiment Analysis in Bitcoin Trading",
    subtitle: "Using NLP for Trading Decisions",
    tags: [{ id: "28", name: "sentiment analysis" }, { id: "4", name: "Bitcoin" }],
    category: { id: "2", name: "Cryptocurrency" },
    description: "Natural Language Processing (NLP) is a powerful tool for analyzing market sentiment. This article explores how sentiment analysis using NLP can be applied to Bitcoin trading...",
    author: { id: "13", username: "NLP Trader", role: "admin" },
    coverImageLink: "https://example.com/image13.jpg",
    rate: 9.4,
    commentsCount: 35,
    likes: "190",
    views: "1400",
    publishTimestamp: BigInt(Date.now() - 17 * 24 * 60 * 60 * 1000), // 17 days ago
    updateTimestamp: BigInt(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
    publishTillToday: "17 days ago",
    updateTillToday: "7 days ago"
  },
  {
    id: "14",
    title: "Options Pricing Models for US Stocks",
    subtitle: "Understanding Options Valuation",
    tags: [{ id: "25", name: "options pricing" }, { id: "2", name: "US stocks" }],
    category: { id: "1", name: "Trading" },
    description: "Options pricing models are essential tools for traders dealing with options. This article provides an overview of the most commonly used options pricing models for US stocks...",
    author: { id: "14", username: "Options Guru", role: "registeredUser" },
    coverImageLink: "https://example.com/image14.jpg",
    rate: 7.6,
    commentsCount: 15,
    likes: "130",
    views: "1000",
    publishTimestamp: BigInt(Date.now() - 19 * 24 * 60 * 60 * 1000), // 19 days ago
    updateTimestamp: BigInt(Date.now() - 8 * 24 * 60 * 60 * 1000), // 8 days ago
    publishTillToday: "19 days ago",
    updateTillToday: "8 days ago"
  },
  {
    id: "15",
    title: "Volatility Modeling for Bitcoin Trading",
    subtitle: "Predicting Market Volatility",
    tags: [{ id: "27", name: "volatility modeling" }, { id: "4", name: "Bitcoin" }],
    category: { id: "2", name: "Cryptocurrency" },
    description: "Market volatility can significantly impact trading decisions. This article discusses various techniques for modeling and predicting volatility in the Bitcoin market...",
    author: { id: "15", username: "Volatility Pro", role: "admin" },
    coverImageLink: "https://example.com/image15.jpg",
    rate: 8.3,
    commentsCount: 18,
    likes: "140",
    views: "1050",
    publishTimestamp: BigInt(Date.now() - 9 * 24 * 60 * 60 * 1000), // 9 days ago
    updateTimestamp: BigInt(Date.now() - 4 * 24 * 60 * 60 * 1000), // 4 days ago
    publishTillToday: "9 days ago",
    updateTillToday: "4 days ago"
  },
  {
    id: "16",
    title: "Quantitative Analysis of US Stock Market Trends",
    subtitle: "Identifying Patterns and Opportunities",
    tags: [{ id: "1", name: "quant" }, { id: "2", name: "US stocks" }],
    category: { id: "1", name: "Trading" },
    description: "Quantitative analysis involves using mathematical and statistical techniques to identify market trends and trading opportunities. This article provides a comprehensive guide to quantitative analysis of US stock market trends...",
    author: { id: "16", username: "Market Analyst", role: "registeredUser" },
    coverImageLink: "https://example.com/image16.jpg",
    rate: 8.8,
    commentsCount: 28,
    likes: "160",
    views: "1250",
    publishTimestamp: BigInt(Date.now() - 22 * 24 * 60 * 60 * 1000), // 22 days ago
    updateTimestamp: BigInt(Date.now() - 11 * 24 * 60 * 60 * 1000), // 11 days ago
    publishTillToday: "22 days ago",
    updateTillToday: "11 days ago"
  },
  {
    id: "17",
    title: "Using Neural Networks for Bitcoin Trading",
    subtitle: "Advanced Techniques",
    tags: [{ id: "10", name: "deep learning" }, { id: "4", name: "Bitcoin" }],
    category: { id: "2", name: "Cryptocurrency" },
    description: "Neural networks are a powerful tool for making trading decisions. This article explores advanced techniques for using neural networks in Bitcoin trading...",
    author: { id: "17", username: "Deep Learning Expert", role: "admin" },
    coverImageLink: "https://example.com/image17.jpg",
    rate: 9.2,
    commentsCount: 30,
    likes: "180",
    views: "1350",
    publishTimestamp: BigInt(Date.now() - 16 * 24 * 60 * 60 * 1000), // 16 days ago
    updateTimestamp: BigInt(Date.now() - 9 * 24 * 60 * 60 * 1000), // 9 days ago
    publishTillToday: "16 days ago",
    updateTillToday: "9 days ago"
  },
  {
    id: "18",
    title: "Quantitative Risk Management for US Stocks",
    subtitle: "Mitigating Financial Risks",
    tags: [{ id: "7", name: "risk management" }, { id: "2", name: "US stocks" }],
    category: { id: "1", name: "Trading" },
    description: "Risk management is a crucial aspect of trading. This article discusses quantitative techniques for managing financial risks when trading US stocks...",
    author: { id: "18", username: "Risk Expert", role: "registeredUser" },
    coverImageLink: "https://example.com/image18.jpg",
    rate: 8.1,
    commentsCount: 20,
    likes: "145",
    views: "1100",
    publishTimestamp: BigInt(Date.now() - 18 * 24 * 60 * 60 * 1000), // 18 days ago
    updateTimestamp: BigInt(Date.now() - 8 * 24 * 60 * 60 * 1000), // 8 days ago
    publishTillToday: "18 days ago",
    updateTillToday: "8 days ago"
  },
  {
    id: "19",
    title: "Developing Automated Trading Systems for Bitcoin",
    subtitle: "From Concept to Implementation",
    tags: [{ id: "1", name: "quant" }, { id: "4", name: "Bitcoin" }],
    category: { id: "2", name: "Cryptocurrency" },
    description: "Automated trading systems can greatly enhance trading efficiency. This article provides a step-by-step guide to developing automated trading systems for Bitcoin...",
    author: { id: "19", username: "Automation Guru", role: "admin" },
    coverImageLink: "https://example.com/image19.jpg",
    rate: 8.6,
    commentsCount: 25,
    likes: "160",
    views: "1200",
    publishTimestamp: BigInt(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
    updateTimestamp: BigInt(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    publishTillToday: "7 days ago",
    updateTillToday: "2 days ago"
  },
  {
    id: "20",
    title: "Quantitative Investment Strategies for US Stocks",
    subtitle: "Maximizing Returns",
    tags: [{ id: "1", name: "quant" }, { id: "2", name: "US stocks" }],
    category: { id: "1", name: "Trading" },
    description: "Quantitative investment strategies can help investors maximize returns. This article explores various quantitative strategies for investing in US stocks...",
    author: { id: "20", username: "Investment Guru", role: "registeredUser" },
    coverImageLink: "https://example.com/image20.jpg",
    rate: 9.3,
    commentsCount: 32,
    likes: "175",
    views: "1300",
    publishTimestamp: BigInt(Date.now() - 13 * 24 * 60 * 60 * 1000), // 13 days ago
    updateTimestamp: BigInt(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
    publishTillToday: "13 days ago",
    updateTillToday: "7 days ago"
  }
];

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
