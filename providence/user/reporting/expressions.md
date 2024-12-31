---
title: Expression Syntax
---

Expressions
===========

Expressions are statements evaluated by CollectiveAccess to a text, numeric or boolean (`true`/`false`) value. Expressions can be used to conditionally trigger (or not) elements of an import mapping or display template, where the boolean value returned determines what happens. Values may be generated through use of functions (described in more detail below), comparisons and mathematical operations.

At its simplest an expression is a number or text quantity. These are examples of perfectly valid expressions:

* 5
* "Software is great"

You'll notice in the examples above that numbers are just numbers while text must be enclosed in quotes (single or double). Any quantity that is non-empty and non-zero will evaluate to "true" meaning that 5 = `true` while 0 = `false`. -1 is also `true`, as it is a non-zero value. Any strings besides "" (no text at all) is `true`, even " " (a single space).

While single values are valid expressions, they're usually only useful when used in conjunction with `operators`. Operators are symbols that take two operands (values), perform some operation, and return a new value based upon the operands. There are several types of operators available in expressions:

Comparison Operators
--------------------

Comparison operators compare two operands and return `true` or `false`. The most common operator is "=", which returns `true` if the operands are exactly the same, false if they are not. For example, "wood" = "wood" is `true` whereas "wood" = "cement" is not. In an import mapping it is possible to use the "=" operator to check if an input field is a certain value.  

Other comparison operators are:

* &gt;		greater than
* &lt;		less than
* &gt;=		greater than or equal
* &lt;=		less than or equal
* &lt;&gt;		not equal
* !=		not equal (alternate form)

Greater than/less than operators only work with numeric values. Equal and not equal work with numbers or text.

Boolean Comparison
------------------

As of version 2.0 values representing boolean `true` and `false` are available for use in comparisons. These allow you to more easily test the return value of an expression of function using the bare, unquoted word "true" or "false". For example, this expression:

```
dateIsRange("1950's") = false
```

Would return `true` when dateIsRange() returns false, which is useful for importer actions and display templates where specific behaviors are triggered by true expressions.

Math Operators
--------------

With expressions you can perform mathematical operations on numbers using +, -, * and /. These are addition, subtraction, multiplication and division respectively. The + operator also works on text, and will merge two text values together into a single run-on text value. For example:

```
4 + 5 	
```		
			
will return the value `9`

```
"Julia" + " plus " + "Allison"
```
	
will return the value `"Julia plus Allison"`

Logical Operators
-----------------

It is also possible to string together many expressions into a larger composite expression using the boolean logic operators "AND" and "OR". "AND" returns `true` if, and only if, both operands evaluates as `true`. "OR" returns `true` if, and only if, at least one operand evaluates as `true`. For example:

```
(5 > 10) AND ("seth" = "seth")	
```	
	
is false because 5 is not greater than 10, and both expressions need to be true for the composite AND to be true

```
(5 > 10) OR ("seth" = "seth")
```
	
is true because "seth" = "seth" is true and only one needs to be true for logical OR to return true

:::note
Prior to version 2.0 logical operators were required to be upper-case only. Both upper and lower-case operators are now allowed.
:::

Additional Comparison Operators
-------------------------------

The comparison operators shown above are useful but limited. There are a couple of additional ones that are really where the action is. They are:

The "IN" Operator
-----------------
"IN" lets you compare a value to a list of values. It returns true if ANY value in the list matches the value you are comparing. For example:

```
"Seth" IN ["Julia", "Allison", "Sophie", "Maria", "Angie", "Seth"]
```

returns `true` while

```
"Joe" IN ["Julia", "Allison", "Sophie", "Maria", "Angie", "Seth"]		
```

returns `false`.

There is also a related "NOT IN" operator which will return `true` if the value is not in the list.

The =~ (regular expression) Operator
------------------------------------

You can compare a value against a regular expression using the =~ operator. Regular expressions are a very powerful and very flexible pattern matching syntax.  At its most basic a regular expression is a simple bit of text that is matched anywhere in the value being compared. For example:

```
"Software is great" =~ /soft/ 
```

returns `true`.

Note that the regular expression is on the right side of the operator and is enclosed in "/" characters. This is a traditional notation for regular expressions; they are enclosed in the forward slashes to set them off from normal text.

There is also a related !~ operator which will return `true` when the value does not match the regular expression.

Variables
---------

This is all well and good, but the above examples are not terribly useful with hardcoded values in them. Where things start getting truly useful is variables.  Any source in an import record can be used as a variable by prefixing its name with a "^" character. So if you were importing an Excel spreadsheet and wanted to apply rules when the word "allison" appears anywhere in the value of column 4 you'd write

```
^4 =~ /allison/
```

Similarly, if you want to make sure that the value in the 10th column is equal to "metal" then you use the expression:

```
^10 = "metal"
```

If you wanted to make sure that both conditions applied to a record  then you'd use:

```
(^4 =~ /allison/) AND (^10 = "metal")
```

If either would suffice you could use "OR" rather than "AND"

For XML input data the variable names are the XML paths – the exact same thing used in the source specification but with a "^" tacked onto the front.

Functions
---------

Functions are black-boxes that you put a number of values into in order to get a single value out of. The expression system current allows the following functions:

<table>
	<thead>
		<tr>
			<th>Function</th>
			<th>Description</th>
			<th>Parameters</th>
			<th>Return value</th>
			<th>Example</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>abs</td><td>Returns the absolute value of a number (eg. changes negative numbers to positive ones); takes a single value as input</td><td></td><td></td><td></td>
		</tr>
		<tr>
			<td>ceil</td><td>Rounds a fractional number up to the next highest integer; takes a single value as input</td><td></td><td></td><td></td>
		</tr>
		<tr>
			<td>floor</td><td>rounds a fractional number down to the next lower integer; takes a single value as input</td><td></td><td></td><td></td>
		</tr>
		<tr>
			<td>int</td><td>Forces a number to be an integer. If the number has a  decimal component it is discarded; takes a single value as input</td><td></td><td></td><td></td>
		</tr>
		<tr>
			<td>max</td><td>Returns the largest value of those passed to it; takes any number of values as input</td><td></td><td></td><td></td>
		</tr>
		<tr>
			<td>min</td><td>Returns the smallest value of those passed to it; takes any number of values as input</td><td></td><td></td><td></td>
		</tr>
		<tr>
			<td>round</td><td>Rounds the number to the closest integer; takes a single value as input</td><td></td><td></td><td></td>
		</tr>
		<tr>
			<td>random</td><td>Returns a random number between zero and the number provided as input ; takes a single value as input</td><td></td><td></td><td></td>
		</tr>
		<tr>
			<td>rand</td><td>Synonym for random</td><td></td><td></td><td></td>
		</tr>
		<tr>
			<td>current</td><td>Evaluates to true if the supplied date expression encompasses the current server date/time [available from version 1.5]</td><td>String &lt;date expression&gt;</td><td></td><td></td>
		</tr>
		<tr>
			<td>future</td><td>Evaluates to true if the supplied date expression ''ends'' any time after the current server date/time. The start date is not considered, so the range may start before or after the current date/time and still evaluate to true [available from version 1.5]</td><td></td><td></td><td></td>
		</tr>
		<tr>
			<td>wc</td><td>Returns number of words (wc = ""word count"") in a supplied text value [available from version 1.5]</td><td>String &lt;text&gt;</td><td></td><td></td>
		</tr>
		<tr>
			<td>length</td><td>Returns number of characters in a supplied text value [available from version 1.5]</td><td>String &lt;text&gt;</td><td></td><td></td>
		</tr>
		<tr>
			<td>sizeof</td><td>Returns number of parameters. useful for counting values. See example below [available from version 1.6]</td><td></td><td></td><td></td>
		</tr>
		<tr>
			<td>count</td><td>Synonym for sizeof</td><td></td><td></td><td></td>
		</tr>
		<tr>
			<td>age</td><td>Calculates age in years. accepts an arbitrary number of parameters greater than 1. It'll take the earliest and latest dates in the parameter list as start and end of the time span, so you don't have to worry about the order. If the result is a span of 0 years (e.g. because only 1 date was passed), it'll retry with the current date added to the list. This is useful to calculate something's/someone's current age. [available from version 1.6]</td><td>Any number of date expressions</td><td></td><td></td>
		</tr>
		<tr>
			<td>ageyears</td><td>Alias for age [available from version 1.6]</td><td>Any number of date expressions</td><td></td><td></td>
		</tr>
		<tr>
			<td>agedays</td><td>Same as age/ageyears, only for days. [available from version 1.6]</td><td>Any number of date expressions</td><td></td><td></td>
		</tr>
		<tr>
			<td>avgdays</td><td>Calculates the average length of the time spans passed as parameters. Accepts an arbitrary number of parameters (>1). [available from version 1.6]</td><td>Any number of date expressions</td><td></td><td></td>
		</tr>
		<tr>
			<td>formatdate</td><td>Formats a valid date expression using PHP's [http://php.net/manual/en/function.date.php date() function]. Formats dates as ISO by default but accepts an optional second parameter to specify the format that gets passed to date(). See the PHP documentation for available options. [available from version 1.6]</td><td>String &lt;date expression&gt;</td><td></td><td></td>
		</tr>
		<tr>
			<td>formatgmdate</td><td>Formats a valid date expression in UTC using PHP's [http://php.net/manual/en/function.gmdate.php gmdate() function]. Formats dates as ISO by default but accepts an optional second parameter to specify the format that gets passed to gmdate(). See the PHP documentation for available options. [available from version 1.6]</td><td>String &lt;date expression&gt;</td><td></td><td></td>
		</tr>
		<tr>
			<td>isvaliddate</td><td>Returns true if parameter parses as a valid date [available from version 1.7]</td><td>String &lt;date expression&gt;</td><td></td><td></td>
		</tr>
		<tr>
			<td>date</td><td>Parses a natural language date into a pair of historic timestamp values, suitable for mathematical comparison.</td><td>String &lt;date expression&gt;</td><td></td><td></td>
		</tr>
		<tr>
			<td>join</td><td>Returns a list of values delimited by the first argument. All other arguments are values. Alias ''implode''. [available from version 1.7]</td><td>Any number of string values</td><td></td><td></td>
		</tr>
		<tr>
			<td>implode</td><td>Synonym for join</td><td></td><td></td><td></td>
		</tr>
		<tr>
			<td>trim</td><td>Trims leading and trailing whitespace from a string. [available from version 1.7]</td><td>&lt;string&gt; text</td><td></td><td></td>
		</tr>
		<tr>
			<td>avg</td><td>Return average of parameter values.</td><td>Any number of numeric values</td><td></td><td></td>
		</tr>
		<tr>
			<td>sum</td><td>Return sum of parameter values</td><td>Any number of numeric values</td><td></td><td></td>
		</tr>
		<tr>
			<td>replace</td><td>Replace values using regular expression</td><td>String &lt;Perl compatible regular expression&gt;</td><td>String &lt;replacement value&gt;</td><td>String &lt;subject value&gt;</td>
		</tr>
		<tr>
			<td>idnoUseCount</td><td>Return number of items a value is used as an identifier (idno) for a given table. </td><td>String &lt;idno value&gt;</td><td>String &lt;table&gt; (optional, if omitted defaults to ""ca_objects"")</td><td></td>
		</tr>
		<tr>
			<td>dateIsRange</td><td>Return true if date is a range rather than a single day, month or year. [available from version 2.0]</td><td>String &lt;date expression&gt;</td><td>boolean</td><td>dateIsRange(1950's)</td>
		</tr>
		<tr>
			<td>fromUnixtime</td><td>Convert Unix timestamp to ISO-8601 formatted date. [available from version 2.0]</td><td>Integer &lt;timestamp&gt;</td><td>ISO date</td><td></td>
		</tr>
		<tr>
			<td>earliestDate</td>
			<td> Returns the earliest date in list of date intervals passed as arguments. Any number of arguments may be passed. String arguments with dates separated by semicolons will be considered as a list of dates. This makes it possible to pass in repeating data fields using metadata element placeholders, so long as the delimiter is a semicolon (which is the default, so it should not need to be set explicitly). Parameters controlling the format of the returned date may be passed as a string formatted as URL query parameters. The parameters are those defined in datetime.conf, including dateFormat and timeOmit. Unless set explicitly timeOmit is assumed to be true. An example parameter string: "dateFormat=iso8601&timeOmit=0" (returns earliest date in ISO format with time included) [available from version 2.0]</td>
			 <td>
			 	Any number of parameters may be passed, each representing one or more date to be compared. Expressions representing multiple
			 	dates, as from a repeating metadata element, should be passed as strings with a semicolon delimiter (the default). Options controlling the format of the return value can be passed as the last parameter. Options should be encoded in
			 	the format of URL query parameters. Supported parameters include options defined in ``datetime.conf``.
			 </td>
			 <td>Date expression</td>
			 <td>
			 	``earliestDate("^ca_objects.dates", "dateFormat=iso8601")``
			 </td>
		</tr>
		<tr>
			<td>latestDate</td>
			<td> Returns the latest date in list of date intervals passed as arguments. [available from version 2.0]</td>
			 <td>
			 	Parameters and options follow the same pattern as that used for ``earliestDate()``
			 </td>
			 <td>Date expression</td>
			 <td>
			 	``latestDate("^ca_objects.dates", "dateFormat=iso8601")``
			 </td>
		</tr>
	</tbody>
</table>


To include the function-produced value in your expression just add the function name with a paren-enclosed list of values following. For example:

```
random(10) > 5  
```	

returns `true` if the random number between 0 and 10 is greater than 5.

* ceil(5.2)				returns 6
* floor(5.6)			returns 5
* round(5.2)			returns 5
* round(5.6)			returns 6
* length("hello")			returns 5
* sizeof(1,2,3,4)		returns 4
* age("23 June 1912", "7 June 1954") returns 41
* age("7 June 1954", "23 June 1912") returns 41 (order doesn't matter)
* age("7 June 1954", "9 May 1945", "23 June 1912") returns 41 ('extra' dates don't matter)
* age("28 January 1985") returns something > 29; 30 if you run it before 28 January 2016
* agedays("23 June 1912", "7 June 1954") returns 15324
* agedays("1912/06/23") returns something > 37653
* avgdays("1912/06/23 - 1954/06/07", "1985/01/28 - 2015/07/24") returns 13229
* avgdays("1945/01/02 - 1945/01/03", "1985/01/28 - 1985/01/29") returns 1
* formatdate("1985/01/28") returns 2015-08-05T14* 28* 31-04* 00. Note that this result can vary based on your time zone setting in setup.php!
* formatgmdate("1985/01/28") returns 1985-01-28T05* 00* 00+00* 00. Note that this result can vary based on your time zone setting in setup.php!
* formatgmdate("1985/01/28", "Y") returns 1985
* trim(" this text has spaces at the end   ") returns "this text has spaces at the end"
* join(", ", "Smith", "Bob") returns "Smith, Bob"

Parentheses
-----------

You may have noticed that parens have been sprinkled through some of the examples. You can use matched parens to group elements of an expression. This makes it easier to read and also ensures that operators are applied in the desired sequence in complex expressions. The three things you need to know about parens are: 

* Each paren'ed sub-expression is evaluated as a single unit, before being combined with other sub-expressions 

* Always match each opening paren with a closing paren

* Parens don't hurt anything, but can improve readability of the expression so you are encouraged to use them liberally.
