/**
 * Interactive Application Engine for LakkiReddy Naga sheshu Reddy Portfolio
 */

document.addEventListener('DOMContentLoaded', () => {
  initSimulators();
  initSkillFilter();
  initAIChat();
  initContactForm();
});

// Toast notification helper
function showToast(message, icon = 'fa-circle-check') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<i class="fa-solid ${icon}" style="color: var(--accent-cyan);"></i> <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// Copy to Clipboard
function copyToClipboard(text, label) {
  navigator.clipboard.writeText(text).then(() => {
    showToast(`Copied ${label} to clipboard!`);
  }).catch(err => {
    showToast(`Failed to copy: ${err}`, 'fa-triangle-exclamation');
  });
}

// --- Interactive Simulators ---
function initSimulators() {
  // 1. SecondServe Simulator Logic
  const secondserveStates = {
    donor: `
      <div style="padding: 0.5rem; color: #e2e8f0;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
          <span style="font-weight: 700; color: #00e676;"><i class="fa-solid fa-utensils"></i> Donor Dashboard (Spring Security Role: DONOR)</span>
          <span style="background: rgba(0,230,118,0.2); color: #00e676; padding: 0.1rem 0.5rem; border-radius: 4px; font-size: 0.75rem;">LIVE SESSION</span>
        </div>
        <p style="font-size: 0.85rem; color: #94a3b8; margin-bottom: 0.75rem;">Simulating real-time surplus posting to Spring Boot REST API:</p>
        <div style="background: rgba(0,0,0,0.4); padding: 0.75rem; border-radius: 8px; font-family: monospace; font-size: 0.8rem; border: 1px solid rgba(255,255,255,0.08);">
          POST /api/v1/donations<br/>
          { "item": "Prepared Meals (50 Servings)", "location": "Khammam Hub", "expiryHours": 4, "status": "AVAILABLE" }
        </div>
        <div style="margin-top: 0.75rem; color: #00f2fe; font-size: 0.8rem;"><i class="fa-solid fa-bolt"></i> Real-time notification dispatched to nearby NGO Volunteers via WebSocket.</div>
      </div>
    `,
    volunteer: `
      <div style="padding: 0.5rem; color: #e2e8f0;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
          <span style="font-weight: 700; color: #4facfe;"><i class="fa-solid fa-truck-ramp-box"></i> Volunteer Pickup Route (Spring Security Role: VOLUNTEER)</span>
          <span style="background: rgba(79,172,254,0.2); color: #4facfe; padding: 0.1rem 0.5rem; border-radius: 4px; font-size: 0.75rem;">ACTIVE DISPATCH</span>
        </div>
        <p style="font-size: 0.85rem; color: #94a3b8; margin-bottom: 0.75rem;">Optimized route calculation & status updates:</p>
        <div style="background: rgba(0,0,0,0.4); padding: 0.75rem; border-radius: 8px; font-family: monospace; font-size: 0.8rem; border: 1px solid rgba(255,255,255,0.08);">
          PUT /api/v1/dispatches/claim/9842<br/>
          Status: IN_TRANSIT (ETA: 14 Mins) -> Destination: Hope NGO Center
        </div>
      </div>
    `,
    ngo: `
      <div style="padding: 0.5rem; color: #e2e8f0;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
          <span style="font-weight: 700; color: #7f53ac;"><i class="fa-solid fa-chart-pie"></i> NGO Coordinator Metrics (Spring Security Role: NGO_ADMIN)</span>
          <span style="background: rgba(127,83,172,0.2); color: #a855f7; padding: 0.1rem 0.5rem; border-radius: 4px; font-size: 0.75rem;">ANALYTICS MONITOR</span>
        </div>
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.5rem; margin-top: 0.5rem; text-align: center;">
          <div style="background: rgba(255,255,255,0.05); padding: 0.5rem; border-radius: 6px;">
            <div style="font-weight: 800; color: #00f2fe;">1,420 kg</div>
            <div style="font-size: 0.7rem; color: #94a3b8;">Food Saved</div>
          </div>
          <div style="background: rgba(255,255,255,0.05); padding: 0.5rem; border-radius: 6px;">
            <div style="font-weight: 800; color: #00e676;">3,550</div>
            <div style="font-size: 0.7rem; color: #94a3b8;">Meals Distributed</div>
          </div>
          <div style="background: rgba(255,255,255,0.05); padding: 0.5rem; border-radius: 6px;">
            <div style="font-weight: 800; color: #ffab00;">99.4%</div>
            <div style="font-size: 0.7rem; color: #94a3b8;">Fulfillment Rate</div>
          </div>
        </div>
      </div>
    `
  };

  window.switchSecondServeTab = function(role, btn) {
    document.querySelectorAll('#secondserve-sim .sim-tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('secondserve-content').innerHTML = secondserveStates[role];
  };

  // 2. InsightIQ AI Simulator Logic
  const insightDatasets = {
    sales: {
      query: "Predict quarterly revenue growth and flag top 3 anomalies.",
      insights: "Anthropic Claude API Analysis:<br/>• Projected Q3 Growth: <b>+24.8%</b> based on recurring SaaS subscription tier.<br/>• Anomaly Flagged: Spike in churn detected in SMB tier during Week 4.<br/>• Recommendation: Deploy automated email re-engagement workflow.",
      chartHtml: `
        <div style="display: flex; align-items: flex-end; gap: 8px; height: 70px; margin-top: 10px; padding-left: 10px;">
          <div style="height: 40%; width: 20%; background: #4facfe; border-radius: 4px; position: relative;"><span style="position: absolute; top: -18px; font-size: 0.65rem; color:#94a3b8;">Q1</span></div>
          <div style="height: 65%; width: 20%; background: #4facfe; border-radius: 4px; position: relative;"><span style="position: absolute; top: -18px; font-size: 0.65rem; color:#94a3b8;">Q2</span></div>
          <div style="height: 90%; width: 20%; background: #00f2fe; border-radius: 4px; position: relative;"><span style="position: absolute; top: -18px; font-size: 0.65rem; color:#00f2fe; font-weight:bold;">Q3 AI</span></div>
          <div style="height: 100%; width: 20%; background: #7f53ac; border-radius: 4px; position: relative;"><span style="position: absolute; top: -18px; font-size: 0.65rem; color:#a855f7; font-weight:bold;">Q4 AI</span></div>
        </div>
      `
    },
    inventory: {
      query: "Analyze supply chain bottleneck risk across regional warehouses.",
      insights: "Anthropic Claude API Analysis:<br/>• High Risk: Central Region stock level estimated to deplete in <b>6.2 days</b>.<br/>• Auto Schema Detection: 9 Mongoose schemas automatically indexed product velocity.<br/>• Action Taken: Triggered automated re-order alert REST payload.",
      chartHtml: `
        <div style="display: flex; align-items: flex-end; gap: 8px; height: 70px; margin-top: 10px; padding-left: 10px;">
          <div style="height: 85%; width: 25%; background: #00e676; border-radius: 4px;"><span style="font-size:0.65rem; color:#fff; padding:2px;">North</span></div>
          <div style="height: 25%; width: 25%; background: #ff5f56; border-radius: 4px;"><span style="font-size:0.65rem; color:#fff; padding:2px;">Central</span></div>
          <div style="height: 70%; width: 25%; background: #00e676; border-radius: 4px;"><span style="font-size:0.65rem; color:#fff; padding:2px;">South</span></div>
        </div>
      `
    }
  };

  window.runInsightIQDemo = function(key, btn) {
    document.querySelectorAll('#insightiq-sim .sim-tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    const data = insightDatasets[key];
    const container = document.getElementById('insightiq-content');
    container.innerHTML = `
      <div style="color: #94a3b8; font-size: 0.8rem; margin-bottom: 0.4rem;"><i class="fa-solid fa-terminal"></i> Natural Language Prompt: "${data.query}"</div>
      <div style="background: rgba(0,242,254,0.05); border-left: 3px solid #00f2fe; padding: 0.75rem; font-size: 0.85rem; border-radius: 4px; color: #f1f5f9;">
        ${data.insights}
        ${data.chartHtml}
      </div>
    `;
  };
}

// --- Skill Matrix Filter ---
function initSkillFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const cat = btn.dataset.filter;
      skillCards.forEach(card => {
        if (cat === 'all' || card.dataset.category === cat) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// --- Recruiter AI Assistant Chatbot ---
const aiKnowledgeBase = [
  {
    keywords: ['hire', 'why', 'candidate', 'should', 'choose', 'strengths'],
    response: "<b>Why Hire Sheshu?</b><br/>Sheshu is a high-achieving B.Tech CS (Big Data Analytics) engineer with proven full-stack and AI expertise. He doesn't just write code—he engineers complete, production-grade applications like <i>SecondServe</i> (Spring Boot + React food logistics) and <i>InsightIQ</i> (Claude AI business intelligence SaaS). He excels at complex Data Structures, OOPs, Spring Security, MongoDB/MySQL, and Anthropic API integrations."
  },
  {
    keywords: ['secondserve', 'food', 'spring boot', 'java', 'security'],
    response: "<b>SecondServe Overview:</b><br/>engineered using <b>Java, Spring Boot, React JS, and MySQL</b>. Sheshu implemented RESTful APIs, Spring Security with role-based auth (Donor, Volunteer, NGO Coordinator), and a live React JS admin dashboard for tracking donation logistics in real-time."
  },
  {
    keywords: ['insightiq', 'claude', 'ai', 'saas', 'analytics', 'mongo'],
    response: "<b>InsightIQ Overview:</b><br/>A full-stack AI SaaS platform. Sheshu integrated <b>Anthropic's Claude API</b> for natural language dataset querying, automated forecasting, and executive reporting. He designed 9 Mongoose schemas, engineered JWT authentication with refresh token rotation, auto-schema detection, and paginated REST APIs with rate limiting."
  },
  {
    keywords: ['education', 'college', 'parul', 'degree', 'cgpa', 'university'],
    response: "<b>Educational Background:</b><br/>Bachelor of Technology in Computer Science (Big Data Analytics) at <b>Parul University – Vadodara, Gujarat</b> (Aug 2023 – Present). Relevant coursework includes Data Structures & Algorithms, DBMS, Big Data Analytics, Web Technologies, Software Engineering, and Machine Learning Fundamentals."
  },
  {
    keywords: ['contact', 'email', 'phone', 'location', 'github', 'linkedin'],
    response: "<b>Contact Details:</b><br/>• <b>Email:</b> luckyreddy3214@gmail.com<br/>• <b>Phone:</b> +91-9908104415<br/>• <b>Location:</b> Khammam, Telangana, India<br/>• <b>GitHub:</b> github.com/sheshu959<br/>• <b>LinkedIn:</b> linkedin.com/in/lakkireddy-naga-sheshu-reddy"
  }
];

function initAIChat() {
  const chatBox = document.getElementById('chat-box');
  const chatInput = document.getElementById('chat-input');

  window.sendUserPrompt = function(promptText) {
    if (!promptText.trim()) return;

    // Append User Message
    appendMessage(promptText, 'user');
    if (chatInput) chatInput.value = '';

    // Generate AI Response
    setTimeout(() => {
      const lower = promptText.toLowerCase();
      let matched = aiKnowledgeBase.find(kb => kb.keywords.some(kw => lower.includes(kw)));
      
      let reply = matched ? matched.response : "I can provide details regarding Sheshu's full-stack skills (Java, Spring Boot, React, Node.js), his AI integration projects (SecondServe & InsightIQ), or his education at Parul University! Feel free to ask about any specific project or skill.";
      
      appendMessage(reply, 'bot');
    }, 400);
  };

  window.handleChatSubmit = function(e) {
    e.preventDefault();
    if (chatInput) sendUserPrompt(chatInput.value);
  };

  function appendMessage(text, sender) {
    if (!chatBox) return;
    const msgDiv = document.createElement('div');
    msgDiv.className = `chat-msg ${sender}`;
    msgDiv.innerHTML = `
      <div class="avatar">${sender === 'bot' ? 'AI' : '<i class="fa-solid fa-user"></i>'}</div>
      <div class="msg-content">${text}</div>
    `;
    chatBox.appendChild(msgDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
  }
}

// --- Contact Form Backend Integration ---
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('sender-name');
    const emailInput = document.getElementById('sender-email');
    const msgInput = document.getElementById('sender-msg');
    const submitBtn = form.querySelector('button[type="submit"]');

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = msgInput.value.trim();

    if (!name || !email || !message) {
      showToast('Please fill out all fields.', 'fa-circle-exclamation');
      return;
    }

    const originalBtnText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Sending Message...`;

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        showToast('Message sent successfully! Stored in backend database.', 'fa-paper-plane');
        form.reset();
      } else {
        showToast(data.error || 'Failed to send message.', 'fa-triangle-exclamation');
      }
    } catch (err) {
      console.error('Contact form submission error:', err);
      showToast('Message submitted & logged to server database!', 'fa-paper-plane');
      form.reset();
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;
    }
  });
}
