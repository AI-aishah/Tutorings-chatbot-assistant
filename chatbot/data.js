// ============================================
// HANOUF'S FILE — this is where the document's content goes.
// ============================================
//
// Break the document into small chunks: one entry per topic,
// section, or paragraph. Each chunk needs:
//   - title: a short label for that topic (helps matching + can be shown)
//   - text:  the actual content the bot will reply with
//
// The more chunks you make (i.e. the smaller/more specific each one is),
// the more accurately the bot can answer specific questions.

const CHATBOT_DATA = [
  {
    title: 'What is IELTS',
    text: 'IELTS stands for the International English Language Testing System. It is a globally standardized test of English language proficiency for non-native English speakers, widely used for study, work, and migration purposes.',
  },
  {
    title: 'IELTS Test Formats',
    text: 'There are two main formats: IELTS Academic and IELTS General Training. Academic is for higher education or professional registration, while General Training is for secondary education, work experience, or migration to English-speaking countries.',
  },
  {
    title: 'IELTS Band Scores Explained',
    text: 'IELTS is scored on a 9-band scale, from 1 (Non-user) to 9 (Expert user). You receive individual band scores for Listening, Reading, Writing, and Speaking, as well as an overall band score which is the average of the four sections rounded to the nearest half band.',
  },
  {
    title: 'IELTS Test Sections',
    text: 'The test consists of four sub-tests or modules: Listening (30 minutes), Reading (60 minutes), Writing (60 minutes), and Speaking (11 to 14 minutes). The total test time is 2 hours and 45 minutes.',
  },
  {
    title: 'IELTS Listening Section',
    text: 'The Listening test takes 30 minutes and consists of 40 questions split across 4 recorded monologues and conversations. You only hear the audio recordings once. In the paper test, you get an extra 10 minutes to transfer answers, while in the computer-delivered test, you get 2 minutes to check answers.',
  },
  {
    title: 'IELTS Reading Section Academic',
    text: 'The Academic Reading test takes 60 minutes and includes 3 long texts taken from books, journals, magazines, and newspapers. There are 40 questions total, testing skills like reading for gist, main ideas, detail, and understanding logical arguments.',
  },
  {
    title: 'IELTS Reading Section General Training',
    text: 'The General Training Reading test takes 60 minutes and has 3 sections with 40 questions. Section 1 contains 2 or 3 short factual texts about daily life. Section 2 contains 2 short work-related texts. Section 3 features one longer, more complex text on a topic of general interest.',
  },
  {
    title: 'IELTS Writing Section Academic',
    text: 'The Academic Writing test lasts 60 minutes and has two tasks. Task 1 requires describing a visual chart, graph, table, or diagram in at least 150 words (spend 20 minutes). Task 2 is an essay responding to a point of view, argument, or problem in at least 250 words (spend 40 minutes).',
  },
  {
    title: 'IELTS Writing Section General Training',
    text: 'The General Training Writing test lasts 60 minutes and has two tasks. Task 1 is a letter (formal, semi-formal, or informal) explaining a situation or requesting information in at least 150 words. Task 2 is an essay in response to a point of view or argument in at least 250 words.',
  },
  {
    title: 'IELTS Speaking Section',
    text: 'The Speaking test is a face-to-face interview with an examiner lasting 11 to 14 minutes, divided into 3 parts. Part 1 is an introduction and interview about familiar topics. Part 2 is a long turn where you talk about a given topic for 1 to 2 minutes. Part 3 is a deeper, abstract discussion related to the topic in Part 2.',
  },
  {
    title: 'IELTS Validity Period',
    text: 'An IELTS Test Report Form (TRF) is typically valid for 2 years from the date of the test. After 2 years, institutions usually require updated proof of English proficiency.',
  },
  {
    title: 'Computer vs Paper IELTS',
    text: 'Both formats feature the exact same content, scoring, and level of difficulty. The paper test requires writing answers by hand, while the computer test requires typing. The Speaking module remains a face-to-face interview for both formats.',
  }
];

// Let the Node server use the same source of truth without affecting the
// browser, where this file is loaded as a normal script.
if (typeof module !== 'undefined') {
  module.exports = { CHATBOT_DATA };
}
