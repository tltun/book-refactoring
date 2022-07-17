const createStatementData = require('./createStatementData');

function statement(invoice, plays) {
  return renderPlainText(createStatementData(invoice, plays));
}

function htmlStatement(invoice, plays) {
  return renderHtml(createStatementData(invoice, plays));
}

function renderPlainText(data, plays) {
  let result = `Statement for ${data.customer}\n`;
  for (const performance of data.performances) {
    // Print line for this order
    result += `    ${performance.play.name}:`;
    result += ` ${usd(performance.amount)}`;
    result += ` (${performance.audience} seats)\n`;
  }

  result += `Amount owed is ${usd(data.totalAmount)}\n`;
  result += `You earned ${data.totalVolumeCredits} credits`;
  return result;
}

function renderHtml(data) {
  let result = `<h1>Statement for ${data.customer}</h1>\n`;
  result += '<table>\n';
  result += '<tr>';
  result += '<th>play</th><th>seats</th><th>cost</th>';
  result += '</tr>\n';
  for (const performance of data.performances) {
    result += '<tr>';
    result += `<td>${performance.play.name}</td>`;
    result += `<td>${performance.audience}</td>`;
    result += `<td>${usd(performance.amount)}</td>`;
    result += '</tr>\n';
  }
  result += '</table>\n';
  result += `<p>Amount owed is <em>${usd(data.totalAmount)}</em></p>\n`;
  result += `<p>You earned <em>${data.totalVolumeCredits}</em> credits</p>\n`;
  return result;
}

function usd(aNumber) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(aNumber / 100);
}

module.exports.htmlStatement = htmlStatement;
module.exports.statement = statement;
