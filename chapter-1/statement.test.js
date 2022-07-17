const { htmlStatement, statement } = require('./statement');
const invoices = require('./data-store/invoices.json');
const plays = require('./data-store/plays.json');

test('prints statement in plain text correctly', function () {
  let statementString = '';
  statementString += 'Statement for BigCo\n';
  statementString += '    Hamlet: $650.00 (55 seats)\n';
  statementString += '    As You Like It: $580.00 (35 seats)\n';
  statementString += '    Othello: $500.00 (40 seats)\n';
  statementString += 'Amount owed is $1,730.00\n';
  statementString += 'You earned 47 credits';
  expect(statement(invoices[0], plays)).toEqual(statementString);
});

test('prints statement in HTML correctly', function () {
  let statementString = '';
  statementString += '<h1>Statement for BigCo</h1>\n';
  statementString += '<table>\n';
  statementString += '<tr><th>play</th><th>seats</th><th>cost</th></tr>\n';
  statementString += '<tr>';
  statementString += '<td>Hamlet</td><td>55</td><td>$650.00</td>';
  statementString += '</tr>\n';
  statementString += '<tr>';
  statementString += '<td>As You Like It</td><td>35</td><td>$580.00</td>';
  statementString += '</tr>\n';
  statementString += '<tr>';
  statementString += '<td>Othello</td><td>40</td><td>$500.00</td>';
  statementString += '</tr>\n';
  statementString += '</table>\n';
  statementString += '<p>Amount owed is <em>$1,730.00</em></p>\n';
  statementString += '<p>You earned <em>47</em> credits</p>\n';
  expect(htmlStatement(invoices[0], plays)).toEqual(statementString);
});
