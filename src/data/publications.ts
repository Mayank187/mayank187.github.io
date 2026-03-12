export interface Publication {
  title: string;
  venue: string;
  year: string;
  summary: string;
  link?: string;
}

export const publications: Publication[] = [
  {
    title: "Keyword Spotting in Images Using Convolutional Neural Network",
    venue:
      "International Journal of Innovative Technology and Exploring Engineering (IJITEE)",
    year: "2019",
    summary:
      "Published as an undergraduate research paper, this work explores the use of convolutional neural networks for keyword spotting in images. The proposed approach uses preprocessing methods including thresholding, normalization, and alignment to enhance image quality before feature extraction. By leveraging CNN-based learning, the system aims to recognize text patterns and improve keyword detection in visual data. The paper highlights an early application of deep learning techniques to computer vision and text recognition tasks.",
    link: "https://www.ijitee.org/wp-content/uploads/papers/v8i6/F3450048619.pdf",
  },
  {
    title: "Wearable Technology for Visually Impaired",
    venue:
      "International Journal of Innovative Research in Engineering and Management (IJIREM)",
    year: "2018",
    summary:
      "Explored the use of wearable devices and image processing techniques to assist visually impaired users with reading and visual understanding tasks.",
    link: "https://ijirem.org/view_abstract.php?title=Wearable-Technology-for-Visually-Impaired&year=2018&vol=5&primary=QVJULTIzNg==",
  },
];

export const publicationsIntro =
  "Beyond shipping production systems, I invest in deepening understanding through research. Publications and technical writing strengthen the feedback loop between theory and deployment, ensuring the systems I build are grounded in principled approaches.";
