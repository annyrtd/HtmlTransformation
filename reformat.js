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
		
		$('textarea#inputTextarea').on("propertychange input change keyup paste click", 
			function() 
			{
				$('textarea#outputTextarea').val(GetTransformedText());
				$('div#copy-tooltip').text("Copy to clipboard");
			}
		);
		
		$('button#copy').click(
			function()
			{
				$('div#copy-tooltip').text("Copied");
			}
		);
	}
);

function GetTransformedText()
{
	var txt = $('textarea#inputTextarea').val();
	if (!(txt.length > 0))
	{
		return "";
	}
	var newTxt = "var str = \"";
	var lines = txt.split("\n");
	for (var i = 0; i < lines.length - 1; i++)
	{
		if (GetProperLine(lines[i]).length > 0)
		{
			newTxt += GetProperLine(lines[i]) + "\" +\n\t \"";
		}
	}	
	
	newTxt += GetProperLine(lines[i]) + "\";";
	return newTxt;
}

function GetProperLine(string)
{
	var newString = string.replace(/\t/g,""); 
	newString = newString.replace(/\"/g, "\\\"");

	return newString;	
}


