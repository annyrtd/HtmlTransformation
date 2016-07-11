document.addEventListener("DOMContentLoaded", function(event) { 
	new Clipboard('.copy');
});

function GetTransformedTextToJScript(txt)
{
	if (!(txt.length > 0))
	{
		return "";
	}
	var properLine, newTxt = "var str = \"";
	var lines = txt.split("\n");
	for (var i = 0; i < lines.length - 1; i++)
	{
		properLine = GetProperLineToJScript(lines[i]);
		if (properLine.length > 0)
		{
			newTxt += properLine + "\" +\n\t\"";
		}
	}	
	properLine = GetProperLineToJScript(lines[i]);
	newTxt += properLine  + "\";";
	
	return newTxt;
}

function GetProperLineToJScript(string)
{
	var newString = string.replace(/\t/g,""); 
	newString = newString.replace(/\"/g, "\\\"");
	return newString;	
}

function GetTransformedTextToHTML(txt)
{	
	if (!(txt.length > 0))
	{
		return "";
	}
	var lines = txt.split("\n");
	var current = "", newTxt = GetProperLineToHTML(lines[0]);
	var numberOfTabs = 0;
	var previous = newTxt;
	
	for (var i = 1; i < lines.length; i++)
	{	
		current = GetProperLineToHTML(lines[i]);
		numberOfTabs += GetNumberOfTabs(previous, current);
		
		if (current.length > 0)
		{
			newTxt += "\n" + GetTabs(numberOfTabs) + current;
		}
		
		previous = current;
	}
	return newTxt;
}

function GetProperLineToHTML(string)
{
	var firstIndex = string.indexOf("\"");
	var lastIndex = string.lastIndexOf("\"");
	var newString = string;
	if ((firstIndex > 0 || lastIndex > 0) && (firstIndex != lastIndex))
	{
		newString = newString.substring(firstIndex + 1, lastIndex);
	}
	newString = newString.replace(/\\\"/g, "\"");
	return newString;	
}

function GetTabs(number)
{
	var str = "";
	for (var i = 0; i < number; i++)
	{
		str += "\t";
	}
	return str;
}

function GetNumberOfTabs(previous, current)
{
	var negative = (previous.match(/<\//g) || []).length + (previous.match(/\/>/g) || []).length;
	var positive = (previous.match(/<[^!\/]/g) || []).length;
	if (current.substring(0,2) == "<\/" || current.substring(0,2) == "<!")
		negative++;
	if (previous.substring(0,2) == "<\/")
		positive++;
	return positive - negative;
}