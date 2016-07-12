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
	var newString = string;
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
	var previous = newTxt;
	
	for (var i = 1; i < lines.length; i++)
	{	
		current = GetProperLineToHTML(lines[i]);
		
		if (current.length > 0)
		{
			newTxt += "\n" + current;
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