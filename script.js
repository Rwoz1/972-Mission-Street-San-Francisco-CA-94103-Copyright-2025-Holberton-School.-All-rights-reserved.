// قاعدة البيانات
const database = {
  achievements: [
      { title: "مشروع التخرج المتميز", description: "تصميم و بناء نضام لحجز القاعات في الكليه و تم العمل عليه" },
      { title: "العمل على git", description: "القدره الكامله و للتعامل مع git" },
      { title: "المهارات الفكرية (Problem-Solving & Logical Thinking)", description: "القدرة على تقسيم المشكلة إلى أجزاء صغيرة وحلها بذكاء و التفكير التحليلي: فهم البيانات والتعامل مع الأخطاء بطريقة منظمةو التفكير خارج الصندوق لإيجاد حلول جديدة" },
      { title: "المهارات العملية والشخصية (Soft Skills)", description: "إدارة الوقت: توزيع المهام وإنهاء المشاريع في الوقت المحدد و التواصل الفعّال: القدرة على شرح الكود والعمل مع الفريق بوضوح و التعلم المستمر: التقنية تتطور بسرعة، فلازم تكون دائم التعلم والتجربة و العمل الجماعي: العمل ضمن فريق سواء في شركة أو مشروع مفتوح المصدر" },
      { title: "ادوات و تقنيات اضافية", description: "SonarQube – أداة لتحليل جودة الكود واكتشاف الأخطاء الأمنية والبرمجية و ESLint – أداة تحليل للكود في JavaScript و TypeScript تساعد في اكتشاف الأخطاء الشائعة. و PHPStan – أداة تحليل كود PHP لاكتشاف الأخطاء دون الحاجة إلى تشغيل الكود و Sentry – منصة قوية لتتبع الأخطاء في التطبيقات، تدعم لغات متعددة مثل JavaScript، Python، PHP، وغيرها. و Xdebug – أداة قوية لتصحيح الأخطاء في PHP، توفر ميزات مثل تحليل الأداء (Profiling) وتتبع الكود أثناء التنفيذ." },
  ],

  certificates: [
      { 
          name: "شهادة تطوير الويب", 
          source: "اكادمية طويق",
          image: "doexQxl.pdf" // اسم الملف الصحيح
      },
      { 
        name: "مهارات مدير المشوع", 
        source: "اكادمية طويق",
        image: "project-management.pdf" // اسم الملف الصحيح
    },
      { 
          name: "شهادة الذكاء اﻻصطناعي التوليدي مع سحابة علي بابا (GenAI)", 
          source: "اكادمية طويق",
          image: "QKD828Q.pdf" // اسم الملف الصحيح
      },
      { 
        name: "تعرف على أساسيات الحاسب الآلي", 
        source: "هدف من صندوق التنمية و الموارد البشرية",
        image: "نسخة 2 من شهاده عن التعرف علئ اساسيات الحاسب الالي.jpg" // اسم الملف الصحيح
    },
      { 
        name: "الطريق إلى الاستدامة من خلال الابتكار في التعلم الذكي", 
        source: " قمة إنوكسيرا ",
        image: "الطريق إلى الاستدامة من خلال الابتكار في التعلم الذكي.pdf" // اسم الملف الصحيح
    },
  ],

  notes: JSON.parse(localStorage.getItem('notes')) || []
};

// نظام الثيمات
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

const toggleTheme = () => {
  body.classList.toggle('light-mode');
  const isLight = body.classList.contains('light-mode');
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
  themeToggle.textContent = isLight ? '🌙' : '🌓';
};

// تحميل الثيم
const savedTheme = localStorage.getItem('theme') || 'dark';
if (savedTheme === 'light') {
  body.classList.add('light-mode');
  themeToggle.textContent = '🌙';
}

// عرض المحتوى
const renderAchievements = () => {
  const grid = document.querySelector('.achievements-grid');
  grid.innerHTML = database.achievements.map(achievement => `
      <div class="achievement-card">
          <h3>${achievement.title}</h3>
          <p>${achievement.description}</p>
      </div>
  `).join('');
};

const renderCertificates = () => {
  const slider = document.querySelector('.certificates-slider');
  slider.innerHTML = database.certificates.map(cert => `
      <div class="certificate-item">
          <img src="${cert.image}" alt="${cert.name}">
          <h3>${cert.name}</h3>
          <p>${cert.source}</p>
      </div>
  `).join('');
};

const renderNotes = () => {
  const notesList = document.querySelector('.notes-list');
  notesList.innerHTML = database.notes.map(note => `
      <div class="note">
          <h4>${note.name}</h4>
          <p>${note.text}</p>
          <div class="note-info">
              <small>${note.email}</small>
              <small>${note.phone}</small>
              <small>${new Date(note.date).toLocaleDateString('ar-EG')}</small>
          </div>
      </div>
  `).join('');
};

// إدارة الملاحظات
document.querySelector('.notes-form').addEventListener('submit', e => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const noteData = {
      id: Date.now(),
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      text: formData.get('text'),
      date: new Date()
  };
  
  database.notes.push(noteData);
  localStorage.setItem('notes', JSON.stringify(database.notes));
  renderNotes();
  sendNoteByEmail(noteData);
  e.target.reset();
});

// إرسال الملاحظة عبر البريد
function sendNoteByEmail(note) {
  const subject = encodeURIComponent("ملاحظة جديدة من الزائر");
  const body = encodeURIComponent(
      `الاسم: ${note.name}\n\nالملاحظة: ${note.text}\n\nالاتصال: ${note.phone} - ${note.email}`
  );
  window.location.href = `mailto:azzooiz333@gmail.com?subject=${subject}&body=${body}`;
}

// التمرير السلس
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
      });
  });
});

// التهيئة الأولية
window.addEventListener('DOMContentLoaded', () => {
  renderAchievements();
  renderCertificates();
  renderNotes();
  themeToggle.addEventListener('click', toggleTheme);
});

// تأثيرات التمرير
window.addEventListener('scroll', () => {
  document.querySelectorAll('.achievement-card, .certificate-item').forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.8) {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
      }
  });
});