var workbook;

function readWorkbookFromRemoteFile(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('get', '题库.xls', true);
    xhr.responseType = 'arraybuffer';
    xhr.onload = function (e) {
        if (xhr.status == 200) {
            var data = new Uint8Array(xhr.response)
            workbook = XLSX.read(data, { type: 'array' });
            if (callback)
                callback(workbook);
            // console.log(workbook)
            let Index = 0
            for (var Title in workbook.Sheets) {
                // console.log(Title)
                $('.TitleList').append('<option value="' + Index + '">' + Title + '</option>')
                Index++
            }

            var fromTo = '';
            // 遍历每张表读取
            //获取选中题库
            let TitleIndex = $('.TitleList').val()
            var sheet0 = workbook.Sheets[workbook.SheetNames[TitleIndex]];
            var str = XLSX.utils.sheet_to_json(sheet0);//利用接口实现转换。
            $('.Title').remove()
            let TID = 1;

            for (var i in str) {
                var 题目 = str[i].题目;
                var A = str[i].A;
                var B = str[i].B;
                var C = str[i].C;
                var D = str[i].D;
                var 答案 = str[i].答案;
                $('.Titles').append(`<div class='Title'>
            <xmp class='Content'>`+ TID + `. ` +
                    题目
                    + `</xmp>
            <div class='Options'>
                <input type='checkbox' name='Option`+ TID + `' value='A'>A. <xmp>` + A + `</xmp>
                <br>
                <input type='checkbox' name='Option`+ TID + `' value='B'>B. <xmp>` + B + `</xmp>
                <br>
                <input type='checkbox' name='Option`+ TID + `' value='C'>C. <xmp>` + C + `</xmp>
                <br>
                <input type='checkbox' name='Option`+ TID + `' value='D'>D. <xmp>` + D + `</xmp>
                <br>
                <span class='AnswerBox'>正确答案:<span class='Answer'>`+ 答案 + `</span></span>
            </div>
        </div>`)
                TID++
            }

        }
    };
    xhr.send();
}

readWorkbookFromRemoteFile()

$('.Start').click(function () {
    var fromTo = '';
    // 遍历每张表读取
    //获取选中题库
    let TitleIndex = $('.TitleList').val()
    var sheet0 = workbook.Sheets[workbook.SheetNames[TitleIndex]];
    var str = XLSX.utils.sheet_to_json(sheet0);//利用接口实现转换。
    $('.Title').remove()
    $('.Submit').remove()
    let TID = 1;
    for (var i in str) {
        var 题目 = str[i].题目;
        var A = str[i].A;
        var B = str[i].B;
        var C = str[i].C;
        var D = str[i].D;
        var 答案 = str[i].答案;
        $('.Titles').append(`<div class='Title'>
            <xmp class='Content'>`+ TID + `. ` +
            题目
            + `</xmp>
            <div class='Options'>
                <input type='checkbox' name='Option`+ TID + `' value='A'>A. <xmp>` + A + `</xmp>
                <br>
                <input type='checkbox' name='Option`+ TID + `' value='B'>B. <xmp>` + B + `</xmp>
                <br>
                <input type='checkbox' name='Option`+ TID + `' value='C'>C. <xmp>` + C + `</xmp>
                <br>
                <input type='checkbox' name='Option`+ TID + `' value='D'>D. <xmp>` + D + `</xmp>
                <br>
                <span class='AnswerBox'>正确答案:<span class='Answer'>`+ 答案 + `</span></span>
            </div>
        </div>`)
        TID++
    }
})

$('.Exam').click(function () {
    // alert('考试')
    let TitleIndex = $('.TitleList').val()
    var sheet0 = workbook.Sheets[workbook.SheetNames[TitleIndex]];
    var str = XLSX.utils.sheet_to_json(sheet0);//利用接口实现转换。
    let TitleLength = str.length
    $('.Title').remove()
    $('.Submit').remove()
    let TID = 1;
    if (TitleLength > 50) {
        for (var i in GetRandom(str)) {
            var 题目 = str[i].题目;
            var A = str[i].A;
            var B = str[i].B;
            var C = str[i].C;
            var D = str[i].D;
            var 答案 = str[i].答案;
            $('.Titles').append(`<div class='Title' TID='` + TID + `'>
                <xmp class='Content'>`+ TID + `. ` +
                题目
                + `</xmp>
                <div class='Options'>
                    <input type='checkbox' class='CC`+ TID + `' name='Option` + TID + `' value='A'>A. <xmp>` + A + `</xmp>
                    <br>
                    <input type='checkbox' class='CC`+ TID + `' name='Option` + TID + `' value='B'>B. <xmp>` + B + `</xmp>
                    <br>
                    <input type='checkbox' class='CC`+ TID + `' name='Option` + TID + `' value='C'>C. <xmp>` + C + `</xmp>
                    <br>
                    <input type='checkbox' class='CC`+ TID + `' name='Option` + TID + `' value='D'>D. <xmp>` + D + `</xmp>
                    <br>
                    <span style='display:none' class='AnswerBox'>正确答案:<span class='Answer'>`+ 答案 + `</span></span>
                </div>
            </div>`)
            TID++
        }
        $('.Titles').append('<button class="Submit">提交</button>')
    } else {
        for (var i in str) {
            var 题目 = str[i].题目;
            var A = str[i].A;
            var B = str[i].B;
            var C = str[i].C;
            var D = str[i].D;
            var 答案 = str[i].答案;
            $('.Titles').append(`<div class='Title' TID='` + TID + `'>
                <xmp class='Content'>`+ TID + `. ` +
                题目
                + `</xmp>
                <div class='Options'>
                    <input type='checkbox' class='CC`+ TID + `' name='Option` + TID + `' value='A'>A. <xmp>` + A + `</xmp>
                    <br>
                    <input type='checkbox' class='CC`+ TID + `' name='Option` + TID + `' value='B'>B. <xmp>` + B + `</xmp>
                    <br>
                    <input type='checkbox' class='CC`+ TID + `' name='Option` + TID + `' value='C'>C. <xmp>` + C + `</xmp>
                    <br>
                    <input type='checkbox' class='CC`+ TID + `' name='Option` + TID + `' value='D'>D. <xmp>` + D + `</xmp>
                    <br>
                    <span style='display:none' class='AnswerBox'>正确答案:<span class='Answer'>`+ 答案 + `</span></span>
                </div>
            </div>`)
            TID++
        }
        $('.Titles').append('<button class="Submit">提交</button>')
    }
})

$(document).on('click', '.Submit', function () {
    // $('.CC1:Checked').map(function(){
    //     alert($(this).val())
    // })
    let E = 0
    $('.Title').map(function () {
        var 答案 = $(this).find('.Answer').text()
        var TID = $(this).attr('TID')
        console.log(TID)
        var CBox = '.CC' + TID + ':Checked'
        // alert(CBox)
        var Select = '';
        $(CBox).each(function () {
            Select += $(this).val()
        })
        // alert(Select)

        if (Select == 答案) {
            $(this).addClass('Yes');
            $(this).find('.AnswerBox').css({
                "display": "block"
            })
        } else {
            $(this).addClass('Error');
            $(this).find('.AnswerBox').css({
                "display": "block"
            })
            E++
        }
    })
    alert('你错了' + E + '个')
})

function GetRandom(arr) {
    var out = [];
    var num = 50;
    while (out.length < num) {
        var temp = (Math.random() * arr.length) >> 0;
        out.push(arr.splice(temp, 1));
    }
    return out
}


$('.Random').click(function () {
    createArr()
})