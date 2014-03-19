$(function (){
    

    if ($("textarea[name=description]").data('editor')=='html')
    {
        $("#formorm_description, textarea[name=description], textarea[name=email_purchase_notes], .cf_textarea_fields").addClass('col-md-6').sceditor({
            plugins: "xhtml",
            height: "450",
            toolbarExclude: "emoticon,cut,copy,paste,pastetext",
            resizeEnabled: "true",
            emoticonsEnabled: "false",
            emoticonsCompat: "false",
            enablePasteFiltering: "true"
        });
    }
    else
    {
        $('#formorm_description, textarea[name=description], textarea[name=email_purchase_notes], .cf_textarea_fields').addClass('col-md-6').sceditorBBCodePlugin({
            toolbar: "bold,italic,underline,strike|left,center,right,justify|" +
            "bulletlist,orderedlist|link,unlink,image,youtube|source",
            resizeEnabled: "true",
            emoticonsEnabled: "false",
            emoticonsCompat: "false",
            enablePasteFiltering: "true"});
    }
    

    $('.tips').popover();

    $("select").chosen();
    
    $('.radio > input:checked').parentsUntil('div .accordion').addClass('in');
    
    $('select[name="locale_select"]').change(function()
    {
         $('#locale_form').submit();
    });
    $('select[name="type"]').change(function()
    {
        // alert($(this).val());
        if($(this).val() == 'email') 
            $('#from_email').parent().parent().css('display','block');
        else
            $('#from_email').parent().parent().css('display','none');
    });

    // form-control class should not be applied on checkbox or radio
    $('input').each(function(){
        if(!$(this).hasClass('form-control')){
            if($(this).attr('type') != "checkbox" && $(this).attr('type') != "radio"){
                $(this).addClass('form-control');
            }
        }
        
    });

    // formorm forms are dynamically generated by kohana, so this is fix for selects
    $('select').each(function(){
        if(!$(this).hasClass('form-control')){
            $(this).addClass('form-control');
            $(this).chosen('destroy').chosen();
        }
    });

    $('.btn-licenses').click(function(){

        id_order = '#'+$(this).attr('data-licenses');
        if($(id_order).hasClass('hide'))
            $(id_order).removeClass('hide');
        else
            $(id_order).addClass('hide');
    });


});

_debounce = function(func, wait, immediate) {
    var timeout, result;
    return function() {
        var context = this, args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) result = func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) result = func.apply(context, args);
        return result;
    };
};

function setCookie(c_name,value,exdays)
{
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var c_value = escape(value) + ((exdays==null) ? "" : ";path=/; expires="+exdate.toUTCString());
    document.cookie=c_name + "=" + c_value;
}