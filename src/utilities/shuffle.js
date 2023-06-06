// Combine and shuffle two arrays
function shuffle() {
  const assets = [
    { image: "/assets/css.png" },
    { image: "/assets/ts.png" },
    { image: "/assets/js.png" },
    { image: "/assets/next.png" },
    { image: "/assets/go.png" },
    { image: "/assets/html5.png" },
    { image: "/assets/node.png" },
    { image: "/assets/react.png" },
  ];

  return [...assets, ...assets]
    .sort(() => Math.random() - 0.5)
    .map((card) => ({ ...card, id: Math.random() * 10000 }));
}

export default shuffle;
