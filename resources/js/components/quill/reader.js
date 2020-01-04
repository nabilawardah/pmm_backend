import Quill from 'quill'

let articleReader

if ($('#article-container-read').length > 0) {
  articleReader = new Quill('#article-container-read', {
    modules: {
      // toolbar: toolbarOptions,
      toolbar: false,
    },
    theme: 'snow',
    readOnly: true,
  })

  articleReader.setContents({
    ops: [
      {
        attributes: { italic: true },
        insert:
          'Dear Ueno is an advice column for people who for some weird reason think we know what we’re doing. Read ',
      },
      {
        attributes: {
          italic: true,
          color: 'inherit',
          link: 'https://medium.com/ueno/dear-ueno-b6946471b26a?source=post_page---------------------------',
        },
        insert: 'more about all this',
      },
      { attributes: { italic: true }, insert: ', or check out our ' },
      {
        attributes: {
          italic: true,
          color: 'inherit',
          link: 'https://loremipsum.ueno.co/dear-ueno/?source=post_page---------------------------',
        },
        insert: 'old advice',
      },
      { attributes: { italic: true }, insert: '.' },
      { insert: '\n' },
      { attributes: { bold: true }, insert: 'From Nathan Lindahl, ' },
      {
        attributes: {
          bold: true,
          color: 'inherit',
          link: 'https://twitter.com/nathans_tweets/status/1163981751682654210?',
        },
        insert: 'via Twitter',
      },
      { attributes: { bold: true }, insert: ':' },
      { insert: '\nDear Ueno,' },
      { attributes: { blockquote: true }, insert: '\n' },
      {
        insert:
          'Your case studies are always top notch, especially that copywriting. Got any tips for crafting a killer case study?',
      },
      { attributes: { blockquote: true }, insert: '\n' },
      { attributes: { italic: true, bold: true }, insert: 'Valgeir Valdimarsson, a writer at Ueno, has tips:' },
      {
        insert:
          '\nDear Nathan,\nI thought you’d never ask.\nWhen you sit down to create a case study, the most important thing to keep in mind is that like all forms of business poetry, case studies have one purpose in life. Namely, to convince someone of something.\nFor people who are uncomfortable with the idea that they are in the business of convincing others, this can be a problem. If you are one of these people, feel free to call yourself a “storyteller” and to call what you do “storytelling.” This is charming and mostly harmless. It may even have the advantage of helping you convince more someones of more somethings.\nBut I digress.\nMy point is that your case study exists to convince three different but related groups of people of three different but related things.\n',
      },
      { attributes: { bold: true }, insert: 'Future clients. ' },
      {
        insert:
          'When you have managed, through some sorcery, to make a prospective client contemplate hiring you, they may go digging about on the internet to inspect your work. On finding your case study they should come away convinced that you know what you are doing. They should also be convinced that the clients you were working for knew what ',
      },
      { attributes: { italic: true }, insert: 'they' },
      {
        insert:
          ' were doing. Most importantly, they should be absolutely convinced that under absolutely no circumstances will anyone be fired for hiring you.',
      },
      { attributes: { list: 'ordered' }, insert: '\n' },
      { attributes: { bold: true }, insert: 'Future recruits. ' },
      {
        insert:
          'You want to convince smart and talented people (preferably smarter and more talented than yourself, if that’s even possible) that working for you — sorry, ',
      },
      { attributes: { italic: true }, insert: 'with ' },
      {
        insert:
          'you — would be a really excellent idea. You want these people to think that your clients (see 1) are really great, that the problems you solve are really interesting, and that you go about solving them in very thoughtful ways. They should also be convinced that they could actually learn something from working with you. How convinced should they be about all this? At least enough to enthusiastically click on any link that will take them to a list of your ',
      },
      { attributes: { color: 'inherit', link: 'https://www.ueno.co/careers' }, insert: 'open positions' },
      { insert: '.' },
      { attributes: { list: 'ordered' }, insert: '\n' },
      { attributes: { bold: true }, insert: 'Your future self. ' },
      {
        insert:
          'At some point in the future, which is where we will all live by then, you (or one of your colleagues, see 2) will go back and inspect your case study. Why exactly will your future self be doing this? Melancholy? Nostalgia? Confusion? Narcissism? Blackmail? The reason is unimportant, and I don’t judge. But it will happen. And when it does, you want your future self to come away with a renewed conviction that they are, as many people like to say, ',
      },
      { attributes: { italic: true }, insert: 'awesome.' },
      {
        insert:
          ' Or at least that they used to be, back in the days when they were still you. Your future self should be able to proudly look back, be reminded of the care you used to put in your work, and be inspired — yes, inspired I say! — to continue onwards and upwards. In other words, you want your case study to add something to your agency’s institutional memory and both represent and perpetuate your ',
      },
      { attributes: { color: 'inherit', link: 'https://ueno.co/about' }, insert: 'glorious company culture' },
      { insert: '.' },
      { attributes: { list: 'ordered' }, insert: '\n' },
      {
        insert:
          'Then you mix it all together and that’s more or less it.\nImportant: When you’re trying to convince people of something, it’s an enormous advantage if what you’re trying to convince them of happens to be actually true.\nBut wait. There’s more.\nCompletely disregarding what I said earlier about storytelling, I highly recommend that you have a story in mind as you create your case study. That’s because you are really a “storyteller,” and a case study is essentially a drama in three acts:\n',
      },
      {
        attributes: { italic: true },
        insert:
          'There’s a hero. The hero faces an obstacle. With the help of a magic spell, the hero overcomes the obstacle and lives happily ever after.',
      },
      {
        insert:
          '\nTo get the details of this story right, you’ll need to talk to a bunch of different people.\nYour first stop should probably be the ',
      },
      { attributes: { bold: true }, insert: 'creative director' },
      {
        insert:
          ' responsible for the project. If they know what they’re doing, which they invariably and obviously do, they will have exactly the kind of intimate in-the-trenches, big-picture knowledge of the project that allows them to outline the story better than anyone else. They will also know the visual assets better than most, and have the “resources” (by which I mean other designers they can boss around) to create new ones when needed.',
      },
      { attributes: { list: 'ordered' }, insert: '\n' },
      { insert: 'Should your project involve any kind of technical wizardry, you should also confer with your ' },
      { attributes: { bold: true }, insert: 'tech director.' },
      { attributes: { list: 'ordered' }, insert: '\n' },
      {
        insert:
          'If your project is a breathtaking demonstration of your agency’s other talents, such as photo- and/or videography, thinking (also known as “',
      },
      {
        attributes: {
          color: 'inherit',
          link: 'https://loremipsum.ueno.co/dear-ueno-how-do-you-build-strategy-on-your-projects-c3b5aa4937e9',
        },
        insert: 'strategy',
      },
      {
        insert:
          '”), copywriting (also known as “business poetry”), illustration, or anything else, you should talk to your ',
      },
      { attributes: { bold: true }, insert: 'photo- and/or videographers, thinkers, business poets, illustrators,' },
      { insert: ' and ' },
      { attributes: { bold: true }, insert: 'all the rest' },
      { insert: '.' },
      { attributes: { list: 'ordered' }, insert: '\n' },
      { insert: 'It should go without saying that a ' },
      { attributes: { bold: true }, insert: 'producer,' },
      { insert: ' should you have the unexpected fortune of having one made available to you, can be most useful.' },
      { attributes: { list: 'ordered' }, insert: '\n' },
      { insert: 'And while you may not want to directly involve the people who are responsible for things like ' },
      { attributes: { bold: true }, insert: 'making clients happy, hiring good people,' },
      { insert: ' and keeping the spirit of ' },
      { attributes: { bold: true }, insert: 'company culture ' },
      {
        insert:
          'alive, you should at least have a picture of them on your desk to remind you that they’re relying on you.',
      },
      { attributes: { list: 'ordered' }, insert: '\n' },
      {
        insert:
          'Least and last on this list, your own job is to make sure the whole thing makes sense — that your case study tells the right story to the right people, and that it’s told in the unmistakeable voice, and warm, fuzzy tone of your brand.\nAnd speaking of your brand, the story you are telling in your case study should align with your agency’s own Big Story. (In Ueno’s case that Big Story would be something like: ',
      },
      {
        attributes: { italic: true },
        insert:
          'Working with industry leaders and startups, helping them solve problems, seize opportunities and build relationships, in a way that makes a meaningful difference to their business and to their clients. ',
      },
      { insert: 'Or words to that effect.)\n' },
      { attributes: { italic: true }, insert: '[Intermission: Take a look at some recent Ueno case studies for ' },
      { attributes: { italic: true, color: 'inherit', link: 'https://ueno.co/work/dorsia' }, insert: 'Dorsia' },
      { attributes: { italic: true }, insert: ', ' },
      { attributes: { italic: true, color: 'inherit', link: 'https://ueno.co/work/clubhouse' }, insert: 'Clubhouse' },
      { attributes: { italic: true }, insert: ', ' },
      { attributes: { italic: true, color: 'inherit', link: 'https://ueno.co/work/copper' }, insert: 'Copper' },
      { attributes: { italic: true }, insert: '.]' },
      {
        insert:
          '\nBut what about the clients?\nYou may have noticed that a few paragraphs ago I helpfully postulated that a case study is a ',
      },
      { attributes: { italic: true }, insert: 'drama ' },
      { insert: 'in which a' },
      { attributes: { italic: true }, insert: ' hero' },
      { insert: ' overcomes an ' },
      { attributes: { italic: true }, insert: 'obstacle' },
      { insert: ' with the help of a ' },
      { attributes: { italic: true }, insert: 'magic spell. ' },
      {
        insert:
          'The surprising thing, to some, is that you are not the hero of the drama. The client is the hero. You are merely the magic spell.\nMy point, for lack of a better word, is that you should not use your case study an excuse to show off to people like yourself. (That’s what ',
      },
      { attributes: { color: 'inherit', link: 'https://www.dribbble.com/ueno' }, insert: 'Dribbble' },
      {
        insert:
          ' is for.)\nWhen a client comes to you with a project, they’re really coming to you with a problem and/or an opportunity. And they want you to use your skills and experience to help them solve the problem and/or seize the opportunity. A case study is your way to show that you understand this. So don’t just show the pretty end result of that process. Show how and why you arrived at the end result.\n(Did that just get super earnest at the end? It will not happen again.)\nSince you mention ',
      },
      {
        attributes: {
          color: 'inherit',
          link: 'https://loremipsum.ueno.co/dear-ueno-how-can-i-start-writing-good-copy-e47185a5e87',
        },
        insert: 'copywriting',
      },
      {
        insert:
          ' in your question, I’m assuming you’re not a designer. I jest — that’s an unfair jab at designers, for which I would apologize if I thought any of them were still reading this.\nIt’s not complicated. Your case studies should sound like your brand. In Ueno’s case, that might mean something like this:\n',
      },
      {
        attributes: { italic: true },
        insert:
          'Assume that your reader is an intelligent and thoughtful person. Use simple, direct language. Don’t use big words to come across as smart. Avoid buzzwords and clichés. Avoid acronyms or abbreviations. A case study isn’t entertainment, but there’s no harm in being at least a little bit entertaining. Having said that, don’t be clever just to be clever. Write like a person talking to a person, not like advertising talking ',
      },
      { insert: 'at' },
      {
        attributes: { italic: true },
        insert: ' a person. Don’t use nouns as verbs, and don’t say “utilize” when you mean “use.”',
      },
      {
        insert:
          '\nFinal piece of advice, and perhaps a plot twist: Maybe you don’t need a fancy case study after all? Case studies are hard. They’re a lot of work. Maybe more than they’re worth. It depends.\nAs I mentioned at the beginning of this possibly overwrought answer, case studies are essentially about convincing people. And there may be plenty of other ways to get your point across.\nMaybe your “case study” should just be a series of ',
      },
      {
        attributes: { color: 'inherit', link: 'https://twitter.com/uenodotco/status/1201957654740062208' },
        insert: 'tweets',
      },
      { insert: ', ' },
      {
        attributes: { color: 'inherit', link: 'https://www.instagram.com/p/B4u8-5On3Nt/' },
        insert: 'Instagram photos',
      },
      { insert: ' or ' },
      {
        attributes: { color: 'inherit', link: 'https://dribbble.com/shots/8989090-Nova-Smarthome' },
        insert: 'Dribbble shots',
      },
      { insert: '?\nJust saying.\nHope this helps,\nYour pal,\n— Valgeir\n' },
    ],
  })
}
