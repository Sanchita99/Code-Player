function getHtmlRender(){
    return (
        `<html>
            <head>
                <style type='text/css'>
                    ${$("#cssPanelVal").val()}
                </style>
            </head>
            <body>
                ${$("#htmlPanelVal").val()}
            </body>
        </html>`
    );
}
function getHtmlRenderWithJs(){
    return (
        `<html>
            <head>
                <style type='text/css'>
                    ${$("#cssPanelVal").val()}
                </style>
            </head>
            <body>
                ${$("#htmlPanelVal").val()}
                <script>
                    ${$("#javascriptPanelVal").val()}
                </script>
            </body>
        </html>`
    );
}

function updateOutput(){

    $("iframe").contents().find("html").html(getHtmlRender());

    document.getElementById("outputPanel").contentWindow
            .eval($("#javascriptPanelVal").val());

}

$(".toggleButton").hover(function () {

    $(this).addClass("highlightedClass");

}, function () {

    $(this).removeClass("highlightedClass");

});

$(".toggleButton").click(function () {

    $(this).toggleClass("active");
    $(this).removeClass("highlightedClass");

    var panelId = $(this).attr("id") + "Panel";

    $("#" + panelId).toggleClass("hidden");

    var numberOfActivePanels = 4 - $('.hidden').length;

    $(".panel").width(($(window).width() / numberOfActivePanels) - 10);

});

$(".panel").height($(window).height() - $("#header").height() - 15);

$(".panel").width(($(window).width() / 2) - 10);

$("textarea").on('change keyup paste', function () {

    updateOutput();

});

function update(text, lang){
    let result_element = document.querySelector(`#highlighting-content-${lang}`);
    if (text[text.length - 1] == "\n") {
        text += " ";
    }
    result_element.innerHTML = text.replace(new RegExp("&", "g"), "&amp;")
                                    .replace(new RegExp("<", "g"), "&lt;");
    Prism.highlightElement(result_element);
}

function sync_scroll(element, lang){
    let result_element = document.querySelector(`#highlighting-lang-${lang}`);
    result_element.scrollTop = element.scrollTop;
    result_element.scrollLeft = element.scrollLeft;
}

function check_tab(element, event){
    let code = element.value;
    if (event.key == "Tab") {
        event.preventDefault(); // stop normal
        let before_tab = code.slice(0, element.selectionStart);
        let after_tab = code.slice(element.selectionEnd, element.value.length);
        let cursor_pos = element.selectionEnd + 1;
        element.value = before_tab + "\t" + after_tab;
        element.selectionStart = cursor_pos;
        element.selectionEnd = cursor_pos;
        update(element.value); 
    }
}


function download(text){
    let filename = "index.html";
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
}

$(".saveButton").on('click', ()=>{
    let text = getHtmlRenderWithJs();
    download(text);
})