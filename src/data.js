export const quizData = {
  quizzes: [
    {
      level: "Level 1",
      title: "Identification",
      badge: 0,
      icon: "backgrounds/bg_l1_new.jpeg",
      badgeicon: "badges/badge_l1.jpeg",
      message: "you have successfully identified Sarita to be in distress.",
      questions: [
        {
          question: "Who needs help ?",
          options: [
            {
              imgsrc: [
                "avatars/sara.png",
                "avatars/david.png",
                "avatars/james.png",
              ],
              username: ["Sarita", "Jatin", "Rahul"],

              para: [
                "has lost interest in activities that she once enjoyed.",
                "has a lot of workload but has been recognized as the best employee twice.",
                "recently married, does avoids informal meeting nowadays.",
              ],
            },
          ],
          points: [20, -10, -10],
          Category: 1,
        },
        {
          question:
            "Which could be a sign of distress that you can observe in Sarita?",
          options: [
            "avoid social activities",
            "persistent sadness",
            "excessive worry ",
            "avoidance of responsibility ",
            "perceive",
            "confidence",
            "optimism",
          ],
          points: [+10, +10, +10, +10, -10, -10, -10],
          Category: 2,
          correctanswers: [0, 1, 2, 3],
          ytVideos: [],
        },
      ],
    },
    {
      level: "Level 2",
      title: "Responding to crisis",
      badge: 1,
      icon: "backgrounds/bg_l2_new.png",
      badgeicon: "badges/badge_l2.png",
      message: "you have successfully responded to crisis",
      questions: [
        {
          question:
            "you notice Sarita having a panic attack. what is the first thing you should do?",
          options: [
            "Call an ambulance immediately.",
            "sit with them and encourage slow breathing.",
          ],
          points: [-10, +10],
          Category: 3,
          correctanswers: [1],
        },
        {
          question:
            "Sarita expresses feelings of wellness hopelessness and mentions she does not see a reason to keep going, what should you do?",
          options: [
            "king ignore the comment & hope they feel better later",
            "Ask directly about the underlying reason.",
          ],
          points: [-10, +10],
          Category: 3,
          correctanswers: [1],
        },
        {
          question:
            "Later that day, in a meeting you see Sarita suddenly breathing rapidly sweating and hypernatural out of anxiety.what among the following can you use to come her down ",
          options: [
            "54321 technique",
            "hydration and posture",
            "box breathing",
            "butterfly hug",
            "PMR (progressive muscle relax)",
            "restructuring",
            "gratitude shifts",
          ],
          points: [70, 30, 40, 20, 60, 50, 10],

          Category: 2,
          correctanswers: [0, 1, 2, 3, 4, 5, 6],
          ytVideos: [
            "https://youtube.com/embed/DT994-DX_28?si=QO6hi4YiK6QRGqla",
            "https://www.youtube.com/embed/6HVNixB8BHA?feature=share",
            "https://www.youtube.com/embed/R-J-4kfu_ww",
            "https://www.youtube.com/embed/E6EuwN8zatE",
            "https://www.youtube.com/embed/difR2tV8NeE",
            "https://www.youtube.com/embed/gvMbjk0 6uJs",
            "https://www.youtube.com/embed/k8h6fWF3Kew"
          ],
        },
      ],
    },
    {
      level: "Level 3",
      title: "Communication Technique",
      badge: 2,
      icon: "backgrounds/bg_l3_new.png",
      badgeicon: "badges/badge_l3.png",
      message: "",
      questions: [
        {
          question:
            "One day during your busy schedule, you find Sarita knocking at your office door and expressing her concern. What will you do?",
          options: [
            "Talk to her immediately.", // Correct option
            "You are busy and get back to her later.",
          ],
          points: [+10, -10],
          Category: 3,
          correctanswers: [0],
        },
        {
          question:
            "Now when you and Sarita are talking: Sarita shares that she feels helpless and agitated. What will you respond?",
          options: [
            "You will give advice and share personal experience.",
            "You will listen to them and calm them down.", // Correct option
          ],
          points: [-10, +10],
          Category: 3,
          correctanswers: [1],
        },
        {
          question:
            "Now that you have identified, responded, and communicated about Sarita's mental well-being, you still find her overwhelmed, burnt out, and undergoing frequent outbursts resulting in high absenteeism. What will be your next step?",
          options: [
            "Help them find the best resources.", // Correct option
            "Suggest they take a vacation.",
          ],
          points: [+10, -10],
          Category: 3,
          correctanswers: [0],
        },
      ],
    },
    {
      level: "Level 4",
      title: "Referring for Professional Help",
      badge: 3,
      icon: "backgrounds/bg_l4_new.png",
      badgeicon: "badges/badge_l4.jpg",
      message:
        "You have successfully guided someone to seek professional help.",
      questions: [
        {
          question:
            "You talk to Sarita and she agreed she needs help but does not know where to start. How can you assist?",
          options: [
            "Help them research local mental health professionals like psychologists/licensed counselors/social workers.", // Correct option
            "Ask her to figure it out herself.",
          ],
          points: [+10, -10],
          Category: 3,
          correctanswers: [0],
        },
        {
          question:
            "Worried about the stigma of seeing a counselor, how can you address their concern?",
          options: [
            "Agree with them and discourage professional help, indicating they will get well soon.",
            "Educate them about the benefits of professional help (YouTube link) and share stories of others who have benefited from counseling.", // Correct option
          ],
          points: [-10, +10],
          Category: 3,
          correctanswers: [1],
        },
        {
          question:
            "Sarita was brave enough to go ahead with your suggestion. Now you find her more engaged and assume that she is doing better. How will you confirm?",
          options: [
            "How did the appointment go?", // Correct option
            "Do you feel the support you are receiving is making a difference?", // Correct option
            "Why did it take so long to seek help?",
            "Are there any small steps you have taken that you are proud of?", // Correct option
            "What medicines are they putting you on?",
          ],
          points: [+10, +10, -10, +10, -10],
          Category: 2,
          ytVideos: [],
          correctanswers: [0, 1, 3],
        },
      ],
    },
  ],
};
