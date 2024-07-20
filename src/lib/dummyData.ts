/*  rich text editor example content  */
import { v4 as uuidv4 } from "uuid";
/*  article  */
import { Category, Tag, User } from "@/types.ts";

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

export const exampleContentHtml = '<h2 style="text-align: center">Hey there 👋</h2><p>This is a <em>basic</em> example of <code>mui-tiptap</code>, which combines <a target="_blank" rel="noopener noreferrer nofollow" href="https://tiptap.dev/">Tiptap</a> with customizable <a target="_blank" rel="noopener noreferrer nofollow" href="https://mui.com/">MUI (Material-UI)</a> styles, plus a suite of additional components and extensions! Sure, there are <strong>all <em>kinds</em> of <s>text</s> <u>formatting</u> options</strong> you’d probably expect from a rich text editor. But wait until you see the <span data-type="mention" data-id="15" data-label="Axl Rose">@Axl Rose</span> mentions and lists:</p><ul><li><p>That’s a bullet list with one …</p></li><li><p>… or two list items.</p></li></ul><p>Isn’t that great? And all of that is editable. <strong><span style="color: #ff9900">But wait, </span><span style="color: #403101"><mark data-color="#ffd699" style="background-color: #ffd699; color: inherit">there’s more!</mark></span></strong> Let’s try a code block:</p><pre><code class="language-css">body {\n  display: none;\n}</code></pre><p></p><p>That’s only the tip of the iceberg. Feel free to add and resize images:</p><img height="auto" src="https://picsum.photos/600/400" alt="random image" width="350" style="aspect-ratio: 3 / 2"><p></p><p>Organize information in tables:</p><table><tbody><tr><th colspan="1" rowspan="1"><p>Name</p></th><th colspan="1" rowspan="1"><p>Role</p></th><th colspan="1" rowspan="1"><p>Team</p></th></tr><tr><td colspan="1" rowspan="1"><p>Alice</p></td><td colspan="1" rowspan="1"><p>PM</p></td><td colspan="1" rowspan="1"><p>Internal tools</p></td></tr><tr><td colspan="1" rowspan="1"><p>Bob</p></td><td colspan="1" rowspan="1"><p>Software</p></td><td colspan="1" rowspan="1"><p>Infrastructure</p></td></tr></tbody></table><p></p><p>Or write down your groceries:</p><ul data-type="taskList"><li data-checked="true" data-type="taskItem"><label><input type="checkbox" checked="checked"><span></span></label><div><p>Milk</p></div></li><li data-checked="false" data-type="taskItem"><label><input type="checkbox"><span></span></label><div><p>Eggs</p></div></li><li data-checked="false" data-type="taskItem"><label><input type="checkbox"><span></span></label><div><p>Sriracha</p></div></li></ul><blockquote><p>Wow, that’s amazing. Good work! 👏 <br>— Mom</p></blockquote><p>Give it a try and click around!</p>';
export const exampleContentText = '"Hey there 👋\n' +
    '\n' +
    'This is a basic example of mui-tiptap, which combines Tiptap with customizable MUI (Material-UI) styles, plus a suite of additional components and extensions! Sure, there are all kinds of text formatting options you’d probably expect from a rich text editor. But wait until you see the @Axl Rose mentions and lists:\n' +
    '\n' +
    '\n' +
    '\n' +
    '\n' +
    '\n' +
    'That’s a bullet list with one …\n' +
    '\n' +
    '\n' +
    '\n' +
    '… or two list items.\n' +
    '\n' +
    'Isn’t that great? And all of that is editable. But wait, there’s more! Let’s try a code block:\n' +
    '\n' +
    'body {\n' +
    '  display: none;\n' +
    '}\n' +
    '\n' +
    '\n' +
    '\n' +
    'That’s only the tip of the iceberg. Feel free to add and resize images:\n' +
    '\n' +
    '\n' +
    '\n' +
    '\n' +
    '\n' +
    'Organize information in tables:\n' +
    '\n' +
    '\n' +
    '\n' +
    '\n' +
    '\n' +
    '\n' +
    '\n' +
    'Name\n' +
    '\n' +
    '\n' +
    '\n' +
    'Role\n' +
    '\n' +
    '\n' +
    '\n' +
    'Team\n' +
    '\n' +
    '\n' +
    '\n' +
    '\n' +
    '\n' +
    'Alice\n' +
    '\n' +
    '\n' +
    '\n' +
    'PM\n' +
    '\n' +
    '\n' +
    '\n' +
    'Internal tools\n' +
    '\n' +
    '\n' +
    '\n' +
    '\n' +
    '\n' +
    'Bob\n' +
    '\n' +
    '\n' +
    '\n' +
    'Software\n' +
    '\n' +
    '\n' +
    '\n' +
    'Infrastructure\n' +
    '\n' +
    '\n' +
    '\n' +
    'Or write down your groceries:\n' +
    '\n' +
    '\n' +
    '\n' +
    '\n' +
    '\n' +
    'Milk\n' +
    '\n' +
    '\n' +
    '\n' +
    'Eggs\n' +
    '\n' +
    '\n' +
    '\n' +
    'Sriracha\n' +
    '\n' +
    '\n' +
    '\n' +
    'Wow, that’s amazing. Good work! 👏 \n' +
    '— Mom\n' +
    '\n' +
    'Give it a try and click around!"';
