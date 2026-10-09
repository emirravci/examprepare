// scripts/assemble_master_exam.js
// Normalizes and packages the complete 140-question Master Exam dataset for Ziraat Bankası Uzman Yardımcılığı
const fs = require('fs');
const path = require('path');

const qDir = path.join(__dirname, '..', 'data', 'questions');

const bgkRaw = JSON.parse(fs.readFileSync(path.join(qDir, 'bankacilik_genel_kultur.json'), 'utf8'));
const ornRaw = JSON.parse(fs.readFileSync(path.join(qDir, 'oruntu_analitik.json'), 'utf8'));
const engRaw = JSON.parse(fs.readFileSync(path.join(qDir, 'ingilizce.json'), 'utf8'));
const alanRaw = JSON.parse(fs.readFileSync(path.join(qDir, 'alan_bilgisayar.json'), 'utf8'));

console.log(`Loaded counts:
- Bankacılık ve Genel Kültür: ${bgkRaw.length}
- Örüntü ve Analitik Düşünme: ${ornRaw.length}
- İngilizce: ${engRaw.length}
- Bilgisayar Mühendisliği: ${alanRaw.length}`);

// Normalizer function
function normalizeQuestion(q, defaultSection, sectionIndex, qNumber) {
  const stem = q.stem || q.questionText || '';
  const answerIdx = (q.answerIndex !== undefined) ? q.answerIndex : (q.correctAnswer !== undefined ? q.correctAnswer : 0);
  
  let diffNum = 2;
  if (typeof q.difficulty === 'number') {
    diffNum = q.difficulty;
  } else if (typeof q.difficulty === 'string') {
    if (q.difficulty.toLowerCase().includes('kolay') || q.difficulty.toLowerCase() === 'easy') diffNum = 1;
    else if (q.difficulty.toLowerCase().includes('zor') || q.difficulty.toLowerCase() === 'hard') diffNum = 3;
    else diffNum = 2;
  }

  return {
    id: q.id,
    examQuestionNo: qNumber,
    section: q.section || defaultSection,
    sectionGroup: sectionIndex, // 1: GY-GK, 2: İngilizce, 3: Alan
    topic: q.topic || 'Genel',
    subtopic: q.subtopic || '',
    difficulty: diffNum,
    stem: stem,
    questionText: stem,
    options: q.options,
    answerIndex: answerIdx,
    correctAnswer: answerIdx,
    explanation: q.explanation || '',
    estimatedTimeSeconds: q.estimatedTimeSeconds || (diffNum === 1 ? 45 : diffNum === 2 ? 65 : 90),
    tags: q.tags || [],
    source: q.source || q.sourceName || 'Ziraat Master Hazırlık Seti'
  };
}

let qNum = 1;
const normBGK = bgkRaw.map(q => normalizeQuestion(q, 'bankacilik-genel-kultur', 1, qNum++));
const normORN = ornRaw.map(q => normalizeQuestion(q, 'oruntu-analitik', 1, qNum++));
const normENG = engRaw.map(q => normalizeQuestion(q, 'ingilizce', 2, qNum++));
const normALAN = alanRaw.map(q => normalizeQuestion(q, 'alan', 3, qNum++));

// Save normalized single files
fs.writeFileSync(path.join(qDir, 'bankacilik_genel_kultur.json'), JSON.stringify(normBGK, null, 2), 'utf8');
fs.writeFileSync(path.join(qDir, 'oruntu_analitik.json'), JSON.stringify(normORN, null, 2), 'utf8');
fs.writeFileSync(path.join(qDir, 'ingilizce.json'), JSON.stringify(normENG, null, 2), 'utf8');
fs.writeFileSync(path.join(qDir, 'alan_bilgisayar.json'), JSON.stringify(normALAN, null, 2), 'utf8');

// Combine to Master 140 Exam
const master140Exam = [...normBGK, ...normORN, ...normENG, ...normALAN];

console.log(`\nMaster Exam Assembled:`);
console.log(`Total questions: ${master140Exam.length}`);
console.log(`Section 1 (GY-GK): ${normBGK.length + normORN.length} sorular (1-${normBGK.length + normORN.length})`);
console.log(`Section 2 (İngilizce): ${normENG.length} sorular (${normBGK.length + normORN.length + 1}-${normBGK.length + normORN.length + normENG.length})`);
console.log(`Section 3 (Alan): ${normALAN.length} sorular (${normBGK.length + normORN.length + normENG.length + 1}-${master140Exam.length})`);

fs.writeFileSync(path.join(qDir, 'ziraat_140_tam_deneme.json'), JSON.stringify(master140Exam, null, 2), 'utf8');
console.log(`Saved master exam to: data/questions/ziraat_140_tam_deneme.json`);
