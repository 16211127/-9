const div = dom.create("<tr><td>hi</td><tr>");
console.log(div);

const nodes = dom.empty(window.empty)
console.log(nodes);

dom.attr(test,'title','Hi');
const title = dom.attr(test,'title');
console.log(title);

console.log(dom.style(test,'border','1px solid black'));

