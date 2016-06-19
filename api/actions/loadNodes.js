export default function loadNodes() {

  let total = 60;
  const filler = Array(total).fill().map((_, i) => i);
  const types = ['star','giant', 'mints', 'diamonds', 'dotsWithLabels'];

  return new Promise((resolve) => {

    let nodes = filler.map((i, e) => {
      return {
        id: i,
        group: types[Math.floor(Math.random()*types.length)]
      };
    });

    let max = total;
    let min = 0;
    let edges = filler.map((i, e) => {
        return {
          from: Math.floor(Math.random() * (max - min + 1) + min),
          to: Math.floor(Math.random() * (max - min + 1) + min)
        };
    });

    resolve({
      nodes: nodes,
      edges: edges
    });
  });
}
