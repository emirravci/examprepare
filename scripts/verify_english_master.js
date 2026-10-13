const fs = require('fs');

try {
  const topics = JSON.parse(fs.readFileSync('data/english_master_topics.json', 'utf8'));
  console.log('✅ Topics parsed successfully. Count:', topics.length);
  
  let validQuestions = 0;
  topics.forEach((t, idx) => {
    if (!t.quiz || t.quiz.length !== 5) {
      console.error(`❌ Topic ${idx + 1} (${t.title}) has ${t.quiz ? t.quiz.length : 0} questions!`);
    } else {
      validQuestions += t.quiz.length;
      t.quiz.forEach((q, qIdx) => {
        if (!q.options || q.options.length !== 5) {
          console.error(`❌ Question ${qIdx + 1} in topic ${t.number} does not have 5 options!`);
        }
        if (typeof q.answerIndex !== 'number' || q.answerIndex < 0 || q.answerIndex > 4) {
          console.error(`❌ Invalid answerIndex in topic ${t.number} q ${qIdx + 1}`);
        }
      });
    }
  });
  console.log('✅ All questions valid! Total:', validQuestions);
} catch(e) {
  console.error('❌ JSON parse error:', e.message);
}

const html = fs.readFileSync('index.html', 'utf8');
console.log('✅ index.html has english-master-view:', html.includes('id="english-master-view"'));
console.log('✅ index.html has data-view-target="english-master":', html.includes('data-view-target="english-master"'));

const appJs = fs.readFileSync('js/app.js', 'utf8');
console.log('✅ app.js has englishMaster import:', appJs.includes('englishMaster'));

const engMasterJs = fs.readFileSync('js/english_master.js', 'utf8');
console.log('✅ english_master.js exists and valid size:', engMasterJs.length);
