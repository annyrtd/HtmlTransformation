var HTMLToJScript = true;

$(document).ready (	() =>
	{
		/*
		$('button#transform').click(
			function()
			{
				$('textarea#outputTextarea').val(GetTransformedText());
			}
		);*/
		
		new Clipboard('.copy');
		
		$("#arrowButton").click(
			function()
			{
				HTMLToJScript = !HTMLToJScript;
				if ($(this).children("i").text() == "arrow_forward")
				{
					$(this).children("i").text("arrow_back");
					$('textarea#inputTextarea').val(GetTransformedTextToHTML());
					$('div#copy-tooltip-input').text("Copy to clipboard");
				}
				else
				{
					$(this).children("i").text("arrow_forward");
					$('textarea#outputTextarea').val(GetTransformedTextToJScript());
					$('div#copy-tooltip-output').text("Copy to clipboard");
				}
			}
		);
		
		$('textarea#inputTextarea').on("propertychange input change keyup paste click", 
			function() 
			{
				if (!HTMLToJScript)
					return;
				$('textarea#outputTextarea').val(GetTransformedTextToJScript());
				$('div#copy-tooltip-output').text("Copy to clipboard");
			}
		);
		
		$('textarea#outputTextarea').on("propertychange input change keyup paste click", 
			function() 
			{
				if (HTMLToJScript)
					return;
				$('textarea#inputTextarea').val(GetTransformedTextToHTML());
				$('div#copy-tooltip-input').text("Copy to clipboard");
			}
		);

		$('button#copy-input').click(
			function()
			{
				$('div#copy-tooltip-input').text("Copied");
				$('textarea#inputTextarea').blur();
			}
		);
		
		$('button#copy-output').click(
			function()
			{
				$('div#copy-tooltip-output').text("Copied");
				$('textarea#outputTextarea').blur();
			}
		);
	}
);

function GetTransformedTextToJScript()
{
	var txt = $('textarea#inputTextarea').val();
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

function GetTransformedTextToHTML()
{	
	var txt = $('textarea#outputTextarea').val();
	if (!(txt.length > 0))
	{
		return "";
	}
	var properLine, newTxt = "";
	var lines = txt.split("\n");
	newTxt = GetProperLineToHTML(lines[0].replace(/var str =/g, "")) + "\n";
	var numberOfTabs = 0;
	var previous = newTxt;
	for (var i = 1; i < lines.length - 1; i++)
	{	
		properLine = GetProperLineToHTML(lines[i]);
		numberOfTabs += GetNumberOfTabs(previous, properLine);
		
		if (properLine.length > 0)
		{
			newTxt += GetTabs(numberOfTabs) + properLine + "\n";
		}
		
		previous = properLine;
	}
	
	properLine = GetProperLineToHTML(lines[i], true);
	newTxt += properLine;	
	
	return newTxt;
}

function GetProperLineToHTML(string, isLast)
{
	var newString = string.substring(2, string.length - 2);
	if (isLast === undefined || !isLast)
	{
		newString = newString.substring(0, newString.length - 1);
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