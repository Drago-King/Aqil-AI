const SYSTEM_PROMPT = `
You are Aqil AI, an advanced AI assistant created by Aqil — a visionary developer from Tamil Nadu, India.

IDENTITY:
- Your name is Aqil AI. Never say you are Gemini, Google, or any other AI.
- If asked who made you, say: "I was created by Aqil."
- If asked what model powers you, say: "I run on a custom intelligence layer built by Aqil."

PERSONALITY:
- Intelligent, calm, precise, and friendly
- Slightly formal but approachable — never robotic
- Never use filler like "Certainly!" or "Of course!" — get straight to the answer
- Use clean structure: use **bold**, bullet points, and code blocks when helpful

EXPERTISE:
1. Programming — Python, JavaScript, web dev, algorithms, debugging
2. Science — physics, chemistry, biology, space, engineering
3. Medicine — symptoms, anatomy, drugs (education only; always advise seeing a doctor)
4. Geopolitics — India, Middle East, global affairs, international relations
5. History — world history, Tamil history, Islamic history, civilizations
6. Economics — personal finance, markets, macroeconomics, investing
7. Literature & Philosophy — classic and modern works, ethical reasoning
8. Career & Productivity — study techniques, career paths, goal setting

RULES:
- Always respond in the same language the user writes in
- For code, always use triple backtick blocks with the language name
- For medical questions, always end with a note to consult a real doctor
- Be concise for simple questions, thorough for complex ones
- If you don't know something, say so honestly — never hallucinate facts

EXAMPLE INTERACTIONS:
User: who are you
Aqil AI: I'm Aqil AI — your personal intelligence assistant, built by Aqil. I can help you with science, code, history, medicine, geopolitics, and much more. What do you need?

User: what is recursion
Aqil AI: Recursion is when a function calls itself to solve a smaller version of the same problem. Every recursive function needs a base case to stop, and a recursive case to keep going.
`;

const getHTML = () => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Aqil AI — Intelligence Refined</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Sora:wght@400;600;700&display=swap" rel="stylesheet">
<style>
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --bg:#09090f;--bg2:#111118;--bg3:#16161f;--bg4:#1c1c28;
  --surface:#1e1e2e;--surface2:#252538;
  --border:#2a2a40;--border2:#3a3a55;
  --accent:#7c6af5;--accent2:#a98bf7;--accent3:#5f4ee0;
  --text:#eeeeff;--text2:#9898c0;--text3:#55557a;
  --teal:#4fc3a1;--coral:#f07070;--gold:#f5c518;
  --success:#4ade80;--r:12px;--r2:8px;--r3:22px;
}
html,body{height:100%;overflow:hidden}
body{background:var(--bg);color:var(--text);font-family:'Inter',sans-serif;font-size:15px;display:flex;flex-direction:column}
.app{display:flex;height:100vh;overflow:hidden}

/* SIDEBAR */
.sidebar{width:256px;min-width:256px;background:var(--bg2);border-right:1px solid var(--border);display:flex;flex-direction:column;transition:transform .3s ease}
.sb-head{padding:18px 14px 14px;border-bottom:1px solid var(--border)}
.logo{display:flex;align-items:center;gap:10px;text-decoration:none;margin-bottom:14px}
.logo-mark{width:36px;height:36px;background:linear-gradient(135deg,#7c6af5,#a98bf7);border-radius:11px;display:flex;align-items:center;justify-content:center;font-family:'Sora',sans-serif;font-weight:700;font-size:14px;color:#fff;letter-spacing:-.5px;flex-shrink:0}
.logo-name{font-family:'Sora',sans-serif;font-size:17px;font-weight:700;color:var(--text)}
.logo-name em{font-style:normal;color:var(--accent2)}
.new-btn{width:100%;display:flex;align-items:center;justify-content:center;gap:7px;padding:9px;background:rgba(124,106,245,.15);border:1px solid rgba(124,106,245,.3);border-radius:var(--r2);color:var(--accent2);font-size:13px;font-weight:500;font-family:'Inter',sans-serif;cursor:pointer;transition:all .2s}
.new-btn:hover{background:rgba(124,106,245,.25);border-color:var(--accent)}
.sb-label{padding:14px 14px 6px;font-size:10px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:var(--text3)}
.chat-list{flex:1;overflow-y:auto;padding:0 6px 8px}
.chat-list::-webkit-scrollbar{width:3px}
.chat-list::-webkit-scrollbar-thumb{background:var(--border2);border-radius:2px}
.chat-item{display:flex;align-items:center;gap:8px;padding:8px 10px;border-radius:var(--r2);cursor:pointer;margin-bottom:1px;transition:background .15s}
.chat-item:hover{background:var(--bg3)}
.chat-item.active{background:var(--surface)}
.chat-ic{color:var(--text3);flex-shrink:0}
.chat-title{font-size:12.5px;color:var(--text2);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.chat-item.active .chat-title{color:var(--text)}
.sb-foot{padding:10px 6px;border-top:1px solid var(--border)}
.user-row{display:flex;align-items:center;gap:9px;padding:8px 10px;border-radius:var(--r2);cursor:pointer;transition:background .15s}
.user-row:hover{background:var(--bg3)}
.av{width:32px;height:32px;border-radius:50%;background:linear-gradient(135deg,var(--accent),var(--teal));display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;color:#fff;flex-shrink:0;font-family:'Sora',sans-serif}
.u-name{font-size:13px;font-weight:500;color:var(--text)}
.u-sub{font-size:11px;color:var(--text3)}

/* MAIN */
.main{flex:1;display:flex;flex-direction:column;overflow:hidden;min-width:0}

/* TOPBAR */
.topbar{height:54px;min-height:54px;background:var(--bg2);border-bottom:1px solid var(--border);display:flex;align-items:center;padding:0 18px;gap:10px}
.menu-btn{width:32px;height:32px;border-radius:var(--r2);background:none;border:none;color:var(--text2);cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .2s;flex-shrink:0}
.menu-btn:hover{background:var(--surface);color:var(--text)}
.model-pill{display:flex;align-items:center;gap:6px;background:var(--surface);border:1px solid var(--border2);border-radius:20px;padding:5px 12px;font-size:12.5px;color:var(--text);cursor:pointer;transition:border-color .2s}
.model-pill:hover{border-color:var(--accent)}
.status-dot{width:7px;height:7px;border-radius:50%;background:var(--success);flex-shrink:0;box-shadow:0 0 6px var(--success)}
.tb-right{margin-left:auto;display:flex;gap:6px}
.ic-btn{width:32px;height:32px;border-radius:var(--r2);background:none;border:1px solid var(--border);color:var(--text2);cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .2s}
.ic-btn:hover{background:var(--surface);color:var(--text);border-color:var(--border2)}

/* CHAT */
.chat-wrap{flex:1;overflow-y:auto;padding:20px 0 8px}
.chat-wrap::-webkit-scrollbar{width:4px}
.chat-wrap::-webkit-scrollbar-thumb{background:var(--border2);border-radius:2px}
.chat-body{max-width:740px;margin:0 auto;padding:0 20px}

/* WELCOME */
.welcome{padding:50px 10px 30px;text-align:center}
.wlc-icon{width:76px;height:76px;background:linear-gradient(135deg,#7c6af5,#a98bf7);border-radius:22px;display:flex;align-items:center;justify-content:center;margin:0 auto 22px;font-family:'Sora',sans-serif;font-size:28px;font-weight:700;color:#fff;box-shadow:0 8px 32px rgba(124,106,245,.3)}
.wlc-title{font-family:'Sora',sans-serif;font-size:30px;font-weight:700;margin-bottom:10px}
.wlc-title span{background:linear-gradient(120deg,#a98bf7,#4fc3a1);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.wlc-sub{font-size:15px;color:var(--text2);max-width:480px;margin:0 auto 32px;line-height:1.65}
.sug-grid{display:grid;grid-template-columns:1fr 1fr;gap:9px;max-width:580px;margin:0 auto}
.sug-card{background:var(--surface);border:1px solid var(--border);border-radius:var(--r);padding:14px 15px;cursor:pointer;text-align:left;transition:all .2s}
.sug-card:hover{border-color:var(--accent);background:var(--surface2);transform:translateY(-2px)}
.sug-em{font-size:20px;margin-bottom:6px}
.sug-t{font-size:13px;font-weight:500;color:var(--text);margin-bottom:3px}
.sug-s{font-size:11.5px;color:var(--text3);line-height:1.4}

/* MESSAGES */
.msg{display:flex;gap:11px;margin-bottom:22px;animation:rise .28s ease}
@keyframes rise{from{opacity:0;transform:translateY(7px)}to{opacity:1;transform:translateY(0)}}
.msg.user{flex-direction:row-reverse}
.msg-av{width:31px;height:31px;border-radius:9px;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;font-family:'Sora',sans-serif}
.msg.user .msg-av{background:linear-gradient(135deg,var(--accent),var(--accent2));color:#fff}
.msg.ai .msg-av{background:var(--surface);border:1px solid var(--border2);font-size:11px;color:var(--accent2)}
.msg-body{flex:1;min-width:0}
.msg-who{font-size:11.5px;color:var(--text3);margin-bottom:5px;font-weight:500}
.msg.user .msg-who{text-align:right}
.msg-text{font-size:14.5px;line-height:1.75;color:var(--text)}
.msg.user .msg-text{background:var(--surface);border:1px solid var(--border);border-radius:14px 3px 14px 14px;padding:10px 14px;display:inline-block;float:right;max-width:85%;clear:both}
.msg.user::after{content:'';display:table;clear:both}
.msg-acts{display:flex;gap:4px;margin-top:8px;opacity:0;transition:opacity .2s}
.msg:hover .msg-acts{opacity:1}
.act{width:26px;height:26px;border-radius:6px;background:none;border:1px solid var(--border);color:var(--text3);cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .18s}
.act:hover{background:var(--surface2);color:var(--text);border-color:var(--border2)}

/* TYPING */
.typing-wrap{display:flex;gap:11px;margin-bottom:22px}
.typing-dots{display:flex;gap:5px;padding:4px 0}
.dot{width:7px;height:7px;border-radius:50%;background:var(--accent);opacity:.4;animation:pulse 1.2s infinite}
.dot:nth-child(2){animation-delay:.2s}
.dot:nth-child(3){animation-delay:.4s}
@keyframes pulse{0%,80%,100%{transform:scale(1);opacity:.4}40%{transform:scale(1.3);opacity:1}}

/* MARKDOWN INSIDE AI BUBBLE */
.ai-content p{margin-bottom:10px}
.ai-content p:last-child{margin-bottom:0}
.ai-content strong{color:#c8b4fb;font-weight:600}
.ai-content em{color:var(--text2)}
.ai-content h3{font-size:15px;font-weight:600;color:var(--text);margin:14px 0 6px}
.ai-content ul,.ai-content ol{margin:8px 0 8px 20px;color:var(--text2);line-height:1.7}
.ai-content li{margin-bottom:4px}
.ai-content blockquote{border-left:3px solid var(--accent);padding:8px 14px;color:var(--text2);margin:12px 0;background:rgba(124,106,245,.08);border-radius:0 var(--r2) var(--r2) 0;font-style:italic}
.ai-content code{background:#0d0d1a;padding:2px 6px;border-radius:5px;font-family:'SF Mono',Consolas,monospace;font-size:13px;color:#c0b0f5;border:1px solid var(--border)}
.code-block{background:#0b0b14;border:1px solid var(--border);border-radius:var(--r2);margin:12px 0;overflow:hidden}
.code-head{display:flex;align-items:center;justify-content:space-between;padding:7px 13px;background:var(--bg3);border-bottom:1px solid var(--border)}
.code-lang{font-size:11.5px;color:var(--text3);font-family:monospace;text-transform:uppercase;letter-spacing:.05em}
.copy-code{font-size:11px;background:none;border:1px solid var(--border);border-radius:5px;color:var(--text3);padding:2px 8px;cursor:pointer;font-family:'Inter',sans-serif;transition:all .2s}
.copy-code:hover{background:var(--surface2);color:var(--text)}
.code-pre{padding:14px;font-family:'SF Mono',Consolas,monospace;font-size:13px;line-height:1.65;color:#c0cff5;overflow-x:auto;white-space:pre}

/* INPUT AREA */
.input-zone{padding:14px 20px 18px;background:var(--bg2);border-top:1px solid var(--border)}
.input-inner{max-width:740px;margin:0 auto}
.chips{display:flex;gap:6px;margin-bottom:10px;flex-wrap:wrap}
.chip{display:flex;align-items:center;gap:4px;padding:4px 10px;border-radius:20px;background:var(--bg3);border:1px solid var(--border);font-size:11.5px;color:var(--text3);cursor:pointer;transition:all .2s;font-family:'Inter',sans-serif;white-space:nowrap}
.chip:hover,.chip.on{border-color:var(--accent);color:var(--accent2);background:rgba(124,106,245,.1)}
.input-box{background:var(--surface);border:1px solid var(--border2);border-radius:var(--r3);overflow:hidden;transition:border-color .2s}
.input-box:focus-within{border-color:var(--accent);box-shadow:0 0 0 3px rgba(124,106,245,.1)}
.tool-row{display:flex;align-items:center;padding:8px 12px;gap:4px;border-bottom:1px solid var(--border)}
.t-btn{display:flex;align-items:center;gap:5px;padding:4px 9px;border-radius:6px;background:none;border:none;color:var(--text3);font-size:12px;cursor:pointer;font-family:'Inter',sans-serif;transition:all .18s;white-space:nowrap}
.t-btn:hover{background:var(--bg3);color:var(--text)}
.t-div{width:1px;height:14px;background:var(--border);margin:0 2px;flex-shrink:0}
.msg-row{display:flex;align-items:flex-end;padding:10px 14px}
textarea#inp{flex:1;background:none;border:none;color:var(--text);font-size:14.5px;font-family:'Inter',sans-serif;line-height:1.6;resize:none;outline:none;max-height:180px;min-height:22px;display:block}
textarea#inp::placeholder{color:var(--text3)}
.send{width:36px;height:36px;border-radius:10px;background:var(--accent);border:none;color:#fff;cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-left:8px;transition:all .2s}
.send:hover{background:var(--accent3);transform:scale(1.06)}
.send:disabled{background:var(--surface2);cursor:not-allowed;transform:none;opacity:.5}
.foot-row{display:flex;align-items:center;justify-content:space-between;padding:7px 14px 2px}
.badges{display:flex;gap:5px}
.badge{font-size:10px;padding:2px 7px;border-radius:4px;background:var(--bg3);border:1px solid var(--border);color:var(--text3)}
.hint{font-size:11px;color:var(--text3)}
kbd{background:var(--bg3);border:1px solid var(--border);border-radius:3px;padding:1px 5px;font-size:10px}

@media(max-width:680px){
  .sidebar{position:fixed;inset:0 auto 0 0;z-index:200;transform:translateX(-100%)}
  .sidebar.open{transform:none}
  .sug-grid{grid-template-columns:1fr}
  .wlc-title{font-size:22px}
  .input-zone{padding:10px 12px 14px}
  .chat-body{padding:0 12px}
}
</style>
</head>
<body>
<div class="app">

<aside class="sidebar" id="sb">
  <div class="sb-head">
    <a class="logo" href="#">
      <div class="logo-mark">Aq</div>
      <div class="logo-name">Aqil <em>AI</em></div>
    </a>
    <button class="new-btn" onclick="newChat()">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
      New conversation
    </button>
  </div>
  <div class="sb-label">Recent</div>
  <div class="chat-list" id="chatList">
    <div class="chat-item active">
      <svg class="chat-ic" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
      <span class="chat-title">Current session</span>
    </div>
  </div>
  <div class="sb-foot">
    <div class="user-row">
      <div class="av">Aq</div>
      <div>
        <div class="u-name">Aqil</div>
        <div class="u-sub">Personal · Gemini 2.5 Flash</div>
      </div>
    </div>
  </div>
</aside>

<main class="main">
  <div class="topbar">
    <button class="menu-btn" onclick="document.getElementById('sb').classList.toggle('open')">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
    </button>
    <div class="model-pill">
      <div class="status-dot"></div>
      Gemini 2.5 Flash
      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color:var(--text3)"><polyline points="6 9 12 15 18 9"/></svg>
    </div>
    <div class="tb-right">
      <button class="ic-btn" title="Clear chat" onclick="newChat()">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 102.13-9.36L1 10"/></svg>
      </button>
      <button class="ic-btn" title="Copy link" onclick="copyLink(this)">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
      </button>
    </div>
  </div>

  <div class="chat-wrap" id="chatWrap">
    <div class="chat-body" id="chatBody">
      <div class="welcome" id="wlc">
        <div class="wlc-icon">Aq</div>
        <h1 class="wlc-title">Hello, I'm <span>Aqil AI</span></h1>
        <p class="wlc-sub">Your personal intelligence, built for depth and precision. Ask anything — science, code, history, medicine, geopolitics, and beyond.</p>
        <div class="sug-grid">
          <div class="sug-card" onclick="use('Explain quantum entanglement in simple, intuitive terms')">
            <div class="sug-em">⚛️</div>
            <div class="sug-t">Quantum entanglement</div>
            <div class="sug-s">Explained simply and intuitively</div>
          </div>
          <div class="sug-card" onclick="use('Write a Python function to reverse a linked list with comments')">
            <div class="sug-em">💻</div>
            <div class="sug-t">Write Python code</div>
            <div class="sug-s">Reverse a linked list with comments</div>
          </div>
          <div class="sug-card" onclick="use('What are the geopolitical implications of BRICS expansion in 2025?')">
            <div class="sug-em">🌍</div>
            <div class="sug-t">BRICS expansion 2025</div>
            <div class="sug-s">Geopolitical implications explained</div>
          </div>
          <div class="sug-card" onclick="use('Build me a daily productivity system as a student in India')">
            <div class="sug-em">📚</div>
            <div class="sug-t">Student productivity</div>
            <div class="sug-s">A daily system tailored for India</div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="input-zone">
    <div class="input-inner">
      <div class="chips">
        <button class="chip on" onclick="this.classList.toggle('on')">🌐 Web</button>
        <button class="chip" onclick="this.classList.toggle('on')">💻 Code</button>
        <button class="chip" onclick="this.classList.toggle('on')">🔬 Science</button>
        <button class="chip" onclick="this.classList.toggle('on')">📖 Explain</button>
        <button class="chip" onclick="this.classList.toggle('on')">🌏 Translate</button>
      </div>
      <div class="input-box">
        <div class="tool-row">
          <button class="t-btn" onclick="insert('Summarize this in clear bullet points:\\n\\n')">📋 Summarize</button>
          <div class="t-div"></div>
          <button class="t-btn" onclick="insert('Write well-commented code for:\\n\\n')">⌨️ Code</button>
          <div class="t-div"></div>
          <button class="t-btn" onclick="insert('Explain step by step:\\n\\n')">💡 Explain</button>
          <div class="t-div"></div>
          <button class="t-btn" onclick="insert('Translate to English:\\n\\n')">🌏 Translate</button>
          <div class="t-div"></div>
          <button class="t-btn" onclick="insert('Compare and contrast:\\n\\n')">⚖️ Compare</button>
        </div>
        <div class="msg-row">
          <textarea id="inp" placeholder="Ask Aqil AI anything…" rows="1" oninput="resize(this);toggleSend()" onkeydown="onKey(event)"></textarea>
          <button class="send" id="sendBtn" onclick="send()" disabled>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg>
          </button>
        </div>
        <div class="foot-row">
          <div class="badges">
            <span class="badge">Gemini 2.5 Flash</span>
            <span class="badge" id="ctxBadge">0 messages</span>
          </div>
          <span class="hint"><kbd>Enter</kbd> send &nbsp;·&nbsp; <kbd>Shift+Enter</kbd> newline</span>
        </div>
      </div>
    </div>
  </div>
</main>
</div>

<script>
let history = [];
let busy = false;

const inp = document.getElementById('inp');
const sendBtn = document.getElementById('sendBtn');
const chatBody = document.getElementById('chatBody');
const wlc = document.getElementById('wlc');
const chatWrap = document.getElementById('chatWrap');

function resize(el){
  el.style.height='auto';
  el.style.height=Math.min(el.scrollHeight,180)+'px';
}
function toggleSend(){
  sendBtn.disabled = !inp.value.trim() || busy;
}
function onKey(e){
  if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();send();}
}
function use(text){
  inp.value=text;
  resize(inp);
  toggleSend();
  send();
}
function insert(t){
  inp.value=t;
  inp.focus();
  resize(inp);
  toggleSend();
}
function newChat(){
  history=[];
  chatBody.innerHTML='';
  chatBody.appendChild(wlc);
  wlc.style.display='';
  inp.value='';
  toggleSend();
  document.getElementById('ctxBadge').textContent='0 messages';
}
function copyLink(btn){
  navigator.clipboard.writeText(location.href).catch(()=>{});
  btn.innerHTML='<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--success)" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>';
  setTimeout(()=>{btn.innerHTML='<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>';},2000);
}

function esc(t){return t.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}

function md(text){
  return text
    .replace(/\`\`\`(\w*)\n([\s\S]*?)\`\`\`/g,(_,l,c)=>\`<div class="code-block"><div class="code-head"><span class="code-lang">\${l||'code'}</span><button class="copy-code" onclick="copyBlock(this)">Copy</button></div><pre class="code-pre">\${esc(c.trim())}</pre></div>\`)
    .replace(/^### (.+)$/gm,'<h3>\$1</h3>')
    .replace(/\*\*(.+?)\*\*/g,'<strong>\$1</strong>')
    .replace(/\*(.+?)\*/g,'<em>\$1</em>')
    .replace(/\`([^\`]+)\`/g,'<code>\$1</code>')
    .replace(/^> (.+)$/gm,'<blockquote>\$1</blockquote>')
    .replace(/^[-*] (.+)$/gm,'<li>\$1</li>')
    .replace(/(<li>[\s\S]+?<\/li>)/g,'<ul>\$1</ul>')
    .replace(/\n\n+/g,'</p><p>')
    .replace(/^([^<].*)$/gm,'<p>\$1</p>');
}

function copyBlock(btn){
  const txt=btn.closest('.code-block').querySelector('.code-pre').textContent;
  navigator.clipboard.writeText(txt).catch(()=>{});
  btn.textContent='Copied!';
  setTimeout(()=>btn.textContent='Copy',1800);
}

function copyMsg(btn){
  const t=btn.closest('.msg').querySelector('.msg-text');
  navigator.clipboard.writeText(t.innerText).catch(()=>{});
}

function addMsg(role,raw){
  if(wlc) wlc.style.display='none';
  const isUser=role==='user';
  const d=document.createElement('div');
  d.className='msg '+(isUser?'user':'ai');
  const timeStr=new Date().toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'});
  d.innerHTML=\`
    <div class="msg-av">\${isUser?'You':'AI'}</div>
    <div class="msg-body">
      <div class="msg-who">\${isUser?'You':'Aqil AI'} · \${timeStr}</div>
      <div class="msg-text \${!isUser?'ai-content':''}">\${isUser?'<span>'+esc(raw)+'</span>':md(raw)}</div>
      \${!isUser?\`<div class="msg-acts">
        <button class="act" onclick="copyMsg(this)" title="Copy">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
        </button>
        <button class="act" title="Good response">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3H14z"/><path d="M7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3"/></svg>
        </button>
      </div>\`:''}
    </div>\`;
  chatBody.appendChild(d);
  chatWrap.scrollTop=chatWrap.scrollHeight;
}

function showTyping(){
  if(wlc) wlc.style.display='none';
  const d=document.createElement('div');
  d.className='typing-wrap';d.id='typing';
  d.innerHTML='<div class="msg-av" style="width:31px;height:31px;border-radius:9px;background:var(--surface);border:1px solid var(--border2);display:flex;align-items:center;justify-content:center;font-size:11px;color:var(--accent2);font-family:Sora,sans-serif;flex-shrink:0">AI</div><div class="typing-dots"><div class="dot"></div><div class="dot"></div><div class="dot"></div></div>';
  chatBody.appendChild(d);
  chatWrap.scrollTop=chatWrap.scrollHeight;
}
function removeTyping(){const t=document.getElementById('typing');if(t)t.remove();}

async function send(){
  const text=inp.value.trim();
  if(!text||busy) return;
  busy=true;sendBtn.disabled=true;
  inp.value='';resize(inp);
  history.push({role:'user',content:text});
  addMsg('user',text);
  showTyping();
  document.getElementById('ctxBadge').textContent=history.length+' messages';

  // Add to sidebar history
  if(history.length===1){
    const li=document.createElement('div');
    li.className='chat-item';
    li.innerHTML='<svg class="chat-ic" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg><span class="chat-title">'+esc(text.slice(0,38))+'</span>';
    const list=document.getElementById('chatList');
    list.insertBefore(li,list.firstChild);
  }

  try{
    const res=await fetch('/',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({message:text,history:history.slice(0,-1)})
    });
    const data=await res.json();
    const reply=data.reply||'Sorry, I could not get a response.';
    removeTyping();
    history.push({role:'assistant',content:reply});
    addMsg('ai',reply);
    document.getElementById('ctxBadge').textContent=history.length+' messages';
  } catch(e){
    removeTyping();
    addMsg('ai','⚠️ **Connection error.** Check your network or API key in Cloudflare.');
  }

  busy=false;
  toggleSend();
  inp.focus();
}
</script>
</body>
</html>`;

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // ── CORS Preflight ──
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        }
      });
    }

    // ── Serve HTML Frontend (GET /) ──
    if (request.method === 'GET' && url.pathname === '/') {
      return new Response(getHTML(), {
        headers: { 'Content-Type': 'text/html; charset=utf-8' }
      });
    }

    // ── AI API (POST /) ──
    if (request.method === 'POST' && url.pathname === '/') {
      let userMessage = '';
      let history = [];

      try {
        const body = await request.json();
        userMessage = body.message || '';
        history = body.history || [];
      } catch {
        return new Response(JSON.stringify({ error: 'Invalid JSON body' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      if (!userMessage.trim()) {
        return new Response(JSON.stringify({ error: 'Empty message' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      // Build Gemini conversation
      const contents = [
        ...history.map(h => ({
          role: h.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: h.content }]
        })),
        { role: 'user', parts: [{ text: userMessage }] }
      ];

      const geminiResponse = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${env.GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            system_instruction: {
              parts: [{ text: SYSTEM_PROMPT }]
            },
            contents,
            generationConfig: {
              temperature: 0.75,
              maxOutputTokens: 2048,
              topP: 0.95,
            }
          })
        }
      );

      const data = await geminiResponse.json();
      const reply =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        data?.error?.message ||
        'I was unable to generate a response. Please try again.';

      return new Response(JSON.stringify({ reply }), {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }

    // ── 404 for anything else ──
    return new Response('Not found', { status: 404 });
  }
};
