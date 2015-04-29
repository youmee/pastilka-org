function updateSite(event) { console.log('Swapping cache...'); window.applicationCache.swapCache(); }
window.applicationCache.addEventListener('updateready', updateSite, false);
var animals = ['Aardvark','Albatross','Alligator','Alpaca','Anaconda','Ant','Anteater','Antelope','Armadillo','Aye-Aye','Baboon','Badger','Bandicoot','Barnacle','Barracuda','Basilisk','Bass','Bat','Beaver','Bee','Beetle','Bird','Bison','Black Fly','Blackbird','Blowfish','Blue Jay','Boa','Boar','Bob-Cat','Bonobo','Boxer dog','Buck','Budgie','Buffalo','Bull','Bull frog','Butterfly','Buzzard','Caribou','Cheetah','Camel','Canary','Carp','Cat','Cattle','Catfish','Chameleon','Centipede','Chicken','Chihuahua','Chipmunk','Clam','Cobra','Cockatiel','Cockatoo','Cockroach','Cod','Coho','Cougar','Cow','Coyote','Crab','Crane','Crawfish','Cray fish','Cricket','Crocodile','Crow','Deer','Dog','Du-gong','Dalmation','Dacshund','Dart Frog','Degus','Dik-dik','Dingo','Dinosaur','Dodo bird','Dolphin','Donkey','Dormouse','Dove','Dragonfly','Drake','Duck','Eagle','EarthLice','Lion','Lionfish','Llama','Lobster','Lynx','Manatee','Mantis','Marmot','Meerkat','Mink','Mole','Mollusks','Mongoose','Monkey','Moose','Mouse','Mule','Muskox','Muskrat','NakTarpan','Terrapin','Tick','Tortoise','Trout','Turkey','Turtle','Uakari','Urchin','Urutu','Vicuna','Viper','Vulture','Vole','Vervet','Walrus','Warbler','Warthog','Wasp','Wallaby','Whale','Whippet','Whooper'];
var __hash = window.location.hash.trim();
var ta, ts;
function gi(name){return document.getElementById(name);}
function _k(key){ return key + window.location.hash; }
function get(key){ return localStorage.getItem(_k(key));}
function set(key, value){localStorage.setItem(_k(key), value);}
function loadHashes(){return localStorage.getItem('hashes');}
function saveHash()
{
	var array = JSON.parse(loadHashes()) || [];
	if(__hash == '') return;
	if(ta.value.trim() == '')
		removeArrayElement(array, __hash);
	else if(!inArray(__hash, array))
		array.push(__hash);

	localStorage.setItem('hashes', JSON.stringify(array));
}

function inHashes(hash)
{
	if (inArray(hash, JSON.parse(loadHashes())))
		return true;

	return false;
}

function removeArrayElement(array, element)
{
	var index = array.indexOf(element);
	if(index == -1) return;

	array.splice(index, 1);
}
function inArray(element, array)
{
	if(!(array instanceof Array))
		return undefined;

	for(var i = 0; i < array.length; i++)
	{
		if(array[i] == element)
			return true;
	}
	return false;
}
document.onreadystatechange = function()
{
	var state = document.readyState;
	if (state == 'interactive')
	{
		init();
		initOnCompleteLoad();
	}
  	else if (state == 'complete')
  	{
    	// initOnCompleteLoad();
  	}
}
function textChanged()
{
	saveStorage(ta.value);
	saveHash(); 
	showPagesLinks();
}
function init()
{
	setUp();

	var save_as_hash = '';
	if(__hash != '')
		save_as_hash = ' as ' + __hash;

	// Adding elements to DOM
	ta = document.createElement('textarea');
	ta.setAttribute('id', 'def-ta');
	ta.setAttribute('cols', 40);
	ta.setAttribute('rows', 22);
	ta.setAttribute('spellcheck', false);
	ta.setAttribute('placeholder', 'Start typing to save' + save_as_hash + '...')
	
	ta.addEventListener('input', textChanged);
	ta.addEventListener('paste', textChanged);

	gi('content').appendChild(ta); 

	// Adding timestamp span
	ts = document.createElement('span');
	ts.setAttribute('id', 'ts');
	ts.setAttribute('class', 'timestamp');
	gi('content').appendChild(ts);
	setTimeout(showTimestamp, 10);
	setTimeout(focusOnTa, 100);

	// If hash is reserved
	checkForReservedPages();

	var aboutspan = gi('about'), dc = '#1CD5E5';
	aboutspan.style.position = 'absolute';
	aboutspan.style.display = 'inline-block';
	aboutspan.style.width = '10px';
	aboutspan.style.height = '10px';
	aboutspan.style.backgroundColor = '#8BECFF';
	aboutspan.style.color = dc;
	aboutspan.style.textAlign = 'center';
	aboutspan.style.borderRadius = '5px';
	aboutspan.style.verticalAlign = 'middle';
	aboutspan.innerHTML = '?';
	aboutspan.style.fontSize = '8px';
	aboutspan.style.webkitTransform = 'rotate(10deg)';
	aboutspan.style.cursor = 'default';
	aboutspan.onmouseover = function(e){ aboutspan.style.color = '#1CBCC9'; }
	aboutspan.onmouseout = function(e){ aboutspan.style.color = dc; }
	aboutspan.onclick = function(e){ window.location.href = window.location.origin + '/#@about'; window.location.reload();}
}

function setUp()
{ 
	showPagesLinks();
}
function focusOnTa()
{
	ta.focus();
}
function showPagesLinks()
{
	var hashes = loadHashes();
	if(typeof hashes != 'undefied')
	{
		var arr = JSON.parse(hashes);
		var curr_hash = __hash;
		var arr_formatted = [];
		var hashes_el = gi('hashes');

		hashes_el.innerHTML = '';

		var newPg = document.createElement('a');
		newPg.appendChild(document.createTextNode('new_page'));
		newPg.setAttribute('href', '/#' + rndAnimalName());
		newPg.addEventListener('click', clck);
		newPg.className = 'newPg';
		hashes_el.appendChild(newPg);
		hashes_el.appendChild(document.createTextNode(' | '));

		for(k in arr)
		{
			var page = arr[k];
			var tnode = document.createTextNode(page);
			var newA = document.createElement('a');
			newA.appendChild(tnode)
			newA.setAttribute('href', '/' + arr[k]);
			if (page == curr_hash) newA.className = 'active';
			newA.addEventListener('click', clck);
			hashes_el.appendChild(newA);
			hashes_el.appendChild(document.createTextNode(" | "));
		}
		hashes_el.removeChild(hashes_el.lastChild);
	}
}

function clck(e)
{
	e.preventDefault();
	var href = e.target.getAttribute('href');
	var clear = href.replace('_', ' ').replace('#', '').replace('/', '').toLowerCase();
	var animals_ = [];
	for(var i = 0; i < animals.length; i++)
		animals_.push(animals[i].toLowerCase());

	if (navigator.onLine && inArray(clear, animals_) && (e.altKey || e.ctrlKey || e.metaKey))
	{
		window.open('http://www.google.com/search?as_q=' + clear + ' animal', '_blank');
		return;
	}

	window.location.href = window.location.origin + href;
	window.location.reload();
}

function rndAnimalName()
{
	var rand = animals[Math.floor(Math.random() * animals.length)];
		rand = rand.toLowerCase().replace(' ', '_');
		
	if(!inHashes(rand))
		return rand;

	return rndAnimalName();
}

function rndHash()
{
	return Math.random().toString(36).substring(2, 10);
}

function initOnCompleteLoad()
{
	ta = document.getElementById('def-ta');
	ta.value = getSavedValue();
}

function getSavedValue()
{
	return get('ta1')
}

function saveStorage(value)
{
	set('ta1', value);
	updateSaveTime();
}

function updateSaveTime()
{
	set('ta1-ts', new Date().getTime());
	setTimeout(showTimestamp, 500);
}

function showTimestamp()
{
	ts = gi('ts');
	var savedts = get('ta1-ts');

	if (savedts == null)
		return false;

	var unixts = new Date(savedts * 1);
	var dateString = "";

	dateString += unixts.getFullYear() + "-";
	dateString += ('0' + (unixts.getMonth() + 1)).slice(-2) + "-";
	dateString += ('0' + unixts.getDate()).slice(-2) + " ";
	dateString += ('0' + unixts.getHours()).slice(-2) + ":";
	dateString += ('0' + unixts.getMinutes()).slice(-2) + ":";
	dateString += ('0' + unixts.getSeconds()).slice(-2);

	ts.innerHTML = "saved on " + dateString;
}


// ------ reserved pages -------
function checkForReservedPages()
{
	var about = '<h1>About Pastilka.org</h1>';
		about += '<em>I want to tell you a little story about Pastilka.org.</em>';
		about += '<p>Once upon a time I had worked with the computer and was needed to quickly copy the text and leave it for a while, '
				+ 'which would then use it later. I had opened Pastie.org and putted there some text, and as it was my private data I did not send them to the server ' 
				+ 'and leave as is in the text box. (I know about text files, but I had the browser is opened and had to do it instantly.) ' 
				+ 'But as you may have guessed I restarted the computer, and then opened the browser and what did I saw? – of course there was an empty text box. :[ ' 
				+ 'That is how the idea of Pastilka was born.</p>';

		about += '<p>FIRST OF ALL: IF YOU CLEAN YOUR BROWSER\'S SITE DATA, YOU MAY LOSE YOUR DATA!</p>';
		about += '<p></p>';
		about += '<p>Second of all: you just paste/input text in textfield and it is already saved!</p>';
		about += '<p>Little easter egg: I use animal names as new page\'s name. When it will appear in header, you can ctrl/cmd+click on it.</p>';
		about += '<p>This web-app is constructed for usefull purposes.</p>';
		about += '<p>It works only in <a href="http://browsehappy.com/" target="_blank">modern browsers</a>.</p>';
		about += '<p>It can be run in offline and works even in mobile.</p>';
		about += '<p>None of your inputs won\'t be sended to any server. You can see this by viewing the sources.</p>';
		about += '<p>All of your data is stored locally in your browser with using <code>localStorage</code> technology ';
		about += 'with <a href="http://stackoverflow.com/a/2989317/528488" target="_blank">limits</a> depending on your browser.</p>';

		about += '<h3>And</h3>';
		about += '<p>You can create your own page. Just type the desired hash name after the slash, like: <code>pastilka.org/<b>#desired_page</b></code> then hit Enter and press Refresh the page. ';
		about += 'Your page will start to persist just after you typed something. If you want to delete the page &mdash; remove the text it contains.</p>';
		about += '<p></p>';

		about += '<h3>Donation</h3>';
		about += '<p>Of course it is absolutely free, but if you want to make donation, you can do it via PayPal.</p>';
		about += '<form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">' +
				'<input type="hidden" name="cmd" value="_s-xclick">' +
				'<input type="hidden" name="hosted_button_id" value="7W6KZHJQR5KHW">' +
				'<input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif" border="0" onclick="donation_clicked();" name="submit" alt="PayPal - The safer, easier way to pay online!">' +
				'<img alt="" border="0" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1">' +
				'</form>';

		about += '<p>Also you can contact me via email: ' + my_mail() + '. Have a nice day!</p>';
		about += '<p>&nbsp;</p>';

	if (__hash == '#@about')
	{
		// I want to see if you clicking accessing about page or not
		// just for statistics
		
		document.title = 'Pastilka.org – About';

		ga('send', 'pageview', { 'page': '#@about' });

		ta.setAttribute('disabled', 'disabled');
		ta.value = about;
		ta.style.visibility = 'hidden';
		ts.style.visibility = 'hidden';

		var aboutDiv = makeDiv();
		aboutDiv.innerHTML = about;
		aboutDiv.style.lineHeight = '1.4em';

		document.querySelector('body').appendChild(aboutDiv);
	}
	else 
	{
		// Other page views
		ga('send', 'pageview');
	}
}

function donation_clicked()
{
	ga('send', 'event', 'button', 'click', 'paypal donation');
}

function my_mail()
{
	var spambotsissucks = '<';
		spambotsissucks += 'a';
		spambotsissucks += ' hr' + 'ef' + '="mai' + 'lto:job' + String.fromCharCode(6 * 10 + 4) + 'youmee' + '.c' + 'o">';
		spambotsissucks += 'job' + String.fromCharCode(6 * 10 + 4) + 'youmee' + '.c' + 'o</' + 'a>';

	return spambotsissucks;
}
function makeDiv()
{
	var cWidth = window.getComputedStyle(ta, null).getPropertyValue('width');
	var cHeight = window.getComputedStyle(ta, null).getPropertyValue('height');
	var crect = ta.getBoundingClientRect();

	var div = document.createElement('div');
		div.style.position = 'absolute';
		div.style.top = crect.top + 'px';
		div.style.left = crect.left + 'px';
		div.style.width = cWidth;
		div.style.height = cHeight;
		div.style.padding = '6px';
		div.style.backgroundColor = 'white';

	window.addEventListener('resize', function(){
		var crect = ta.getBoundingClientRect();
		div.style.top = crect.top + 'px';
		div.style.left = crect.left + 'px';
	});

	return div;
}