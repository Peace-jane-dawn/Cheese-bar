

// 初始化 jsPsych
var jsPsych=initJsPsych(
    {extensions: [{type: Naodao}],
    override_safe_mode: true,
    // 实验结束时执行的函数
    on_finish: function() {
    jsPsych.data.get().localSave('csv',`data_exp_demo_${subID}.csv`) // 从浏览器下载
    jsPsych.data.get
    document.getElementById('jspsych-content').innerHTML += '实验结束，感谢您的参与！'
}
});

// 为被试生成随机实验编号
const subID = jsPsych.randomization.randomID(8)

var timeline=[];

// 设置 HTML 样式
var set_html_style_EAST = {
    type:jsPsychCallFunction,
    func: function() {
        document.body.style.backgroundColor = 'black'
        document.body.style.color = 'white'
        document.body.style.fontSize = '36px'
        document.body.style.fontFamily = 'Microsoft Himalaya'
        document.body.style.fontWeight = 'normal'
        document.body.style.cursor = 'none'
    },
}

// 打开全屏模式
var open_fullscreen = {
    type:jsPsychFullscreen,
    fullscreen_mode: true,
    // 全屏开始提示信息
    message: `
    <div style="font: 16pt 微软雅黑; text-align: left; line-height: 1.6em">
    <b>
    测验将在一个「全屏页面」开始，为确保最佳效果，请你：<br/>
    （1）在电脑上进行测验，推荐使用Chrome<br/>
    &emsp;&emsp;（也可使用Edge、Firefox、Safari等，不要用IE）<br/>
    （2）尽量关掉电脑上其他一切正在运行的程序，尤其是360卫士<br/>
    （3）将手机调至静音，并尽可能减少环境噪音干扰<br/>
    （4）在测验过程中不要退出全屏<br/>
    （5）务必认真作答<br/><br/>
    </b>
    如果你同意参与，并且清楚理解了上述要求，请点击开始：
    </div>`,
    button_label: '点击这里全屏开始',
    delay_after: 100
}
timeline.push(open_fullscreen);

// 采集参与者信息
var pername={
    type:jsPsychSurveyText,
    questions:[
        {prompt:'<p style="font: 16pt 微软雅黑">您的姓名是</p>'},
        {prompt:'<p style="font: 16pt 微软雅黑">您的实验编号是</p>'}
    ],
    data: { varname: 'pername' },
    button_label:'继续',
};
timeline.push(pername);

// 指导语
var ins_1={
    type:jsPsychHtmlKeyboardResponse,
    stimulus: `<p style="font: 16pt 微软雅黑; text-align: left; line-height: 1.6em">
    实验开始时会在屏幕中央出现一个<span style="color:#FF0000">"+"</span>，请您集中注意注视它。<br/>
    <br/><br/>
    很快它将会被两个文字代替，请您认真阅读，并又快又准确地判断<span style="color:#FF0000">这两个字能否构成一个有意义的词语</span>。<br/>
    若能，请按<span style="color:#FF0000">‘F’</span>键；若不能，请按<span style="color:#FF0000">‘J’</span>键。<br/>
    <br/><br/>
    如果您已经明白以上指导语，请按空格键开始进行练习实验
    </p>`,
    choices:[' '],
}
timeline.push(ins_1);

// 比较按键响应。如果按键一致则返回正确
function compare_keys(data) {
    data.correct = jsPsych.pluginAPI.compareKeys(data.response, data.correct_answer);
}

// 注视点显示
var fixation ={
    type: jsPsychHtmlKeyboardResponse,
    stimulus: '<div style="font-size:60px;">+</div>',
    choices:"NO_KEYS",
    trial_duration: 800,
    post_trial_gap: 0,
    response_ends_trial: false,
    data: {
        plugin_name: "fixation"
    }
}

// 提供反馈
var feed={
    type:jsPsychCategorizeHtml,
    stimulus:jsPsych.timelineVariable('seeword'),
    stimulus_duration:3000,
    trial_duration: 3000,
    choices:['f','j'],
    key_answer: jsPsych.timelineVariable('choice'),
    correct_text:'<p style="font: 24pt 微软雅黑; color: green;">回答正确</p>',
    incorrect_text:'<p style="font: 24pt 微软雅黑; color: red;">回答错误</p>',
    feedback_duration:2000,
    post_trial_gap:600,
    timeout_message:'<p style="font: 24pt 微软雅黑">请尽快作出判断并按键</p>',
    data: {
        plugin_name: "feed",//为实验设置一个插件名，可以显示在实验数据中
        correct_choice: jsPsych.timelineVariable("choice"), //正确答案来自于timelinevariable中的“choice”
    }  
}

// 练习阶段
var exercise={
    timeline:[fixation,feed],
    // 看到的词汇变量来自于timeline_variables[seeword],正确答案为timeline_variables[choice]
    timeline_variables:[
        {seeword:'类的',choice:'j'},
        {seeword:'天空',choice:'f'},
        {seeword:'山脚',choice:'f'},
        {seeword:'卡南',choice:'j'},
        {seeword:'花朵',choice:'f'},
        {seeword:'立刻',choice:'f'}
    ],
    randomize_order:true,
    data:{
        plugin_name: "test",
        correct_answer:jsPsych.timelineVariable("choice"),
        namewrtie:jsPsych.timelineVariable
    }
} 

// 重复练习
var repeatr={
    type:jsPsychHtmlKeyboardResponse,
    choices:['q',' '],
    stimulus:'<p style="font: 24pt 微软雅黑; ">若要继续进行练习请按Q键；若要开始实验请按下空格键</p>',
    data: {
        correct_response:'q',
    },
    //将实际反应与正确反应（空格）做对比。如果正确（选择空格）则开始正式实验，反之则继续直到按下空格
    on_finish: function(data){
        if(jsPsych.pluginAPI.compareKeys(data.response, data.correct_response)){
            data.correct = true;
        } else {
            data.correct = false;
        }
    }
}

// 循环节点。根据上一个的反应判断（是否正确）是否需要循环时间线[exercise,repeatr]
var loop_node = {
    timeline: [exercise,repeatr],
    loop_function: function(data){
        if( jsPsych.data.get().last(1).values()[0].correct){
            return true;
        } else {
            return false;
        }
    }
}
timeline.push(loop_node);

// 注视点显示
var fixation2 ={
    type: jsPsychHtmlKeyboardResponse,
    stimulus: '<div style="font-size:60px;">+</div>',
    choices:"NO_KEYS",
    trial_duration: 800,
    post_trial_gap: 0,
    response_ends_trial: false,
    data: {
        plugin_name: "fixation2"
    }
}

// 实验词汇判断任务
var real_word={
    type:jsPsychHtmlKeyboardResponse,
    stimulus:jsPsych.timelineVariable('seeword'),
    stimulus_duration:3000,
    trial_duration:3000,
    post_trial_gap:600,
    choices:['f','j'],
    data: {
        plugin_name: "real_word",
        correct_answer:jsPsych.timelineVariable("choice"),
    } ,
    on_finish:compare_keys 
}

var real_exercise={
    timeline:[fixation2,real_word],
    // 看到的词汇变量来自于timeline_variables[seeword],正确答案为timeline_variables[choice]
    timeline_variables:[ 
        {seeword:'它事',choice:'j'},
        {seeword:'骑车',choice:'f'},
        {seeword:'追求',choice:'f'},
        {seeword:'志向',choice:'f'},
        {seeword:'了噢',choice:'j'},
        {seeword:'公益',choice:'f'},
        {seeword:'骑车',choice:'f'},
        {seeword:'当然',choice:'f'},
        {seeword:'丘戈',choice:'j'},
        {seeword:'和谐',choice:'f'},
        {seeword:'春天',choice:'f'},
        {seeword:'补垂',choice:'j'},
        {seeword:'阳光',choice:'f'},
        {seeword:'家庭',choice:'f'},
        {seeword:'凌殳',choice:'j'},
        {seeword:'友情',choice:'f'},
        {seeword:'创新',choice:'f'},
        {seeword:'一风',choice:'j'},
        {seeword:'知识',choice:'f'},
        {seeword:'自由',choice:'f'},
        {seeword:'说个',choice:'j'},
        {seeword:'科技',choice:'f'},
        {seeword:'友谊',choice:'f'},
        {seeword:'按类',choice:'j'},
        {seeword:'勇气',choice:'f'},
        {seeword:'诚信',choice:'f'},
        {seeword:'我离',choice:'j'},
        {seeword:'环保',choice:'f'},
        {seeword:'文化',choice:'f'},
        {seeword:'拉卡',choice:'j'},
        {seeword:'山川',choice:'f'},
        {seeword:'河流',choice:'f'},
        {seeword:'哦傲',choice:'j'},
        {seeword:'爱心',choice:'f'},
        {seeword:'责任',choice:'f'},
        {seeword:'闹是',choice:'j'},
        {seeword:'发展',choice:'f'},
        {seeword:'创造',choice:'f'},
        {seeword:'使而',choice:'j'},
        {seeword:'信仰',choice:'f'},
        {seeword:'劳动',choice:'f'},
        {seeword:'放类',choice:'j'},
        {seeword:'奉献',choice:'f'},
        {seeword:'尊严',choice:'f'},
        {seeword:'拍排',choice:'j'},
        {seeword:'绿色',choice:'f'},
        {seeword:'科学',choice:'f'},
        {seeword:'解可',choice:'j'},
        {seeword:'追求',choice:'f'},
        {seeword:'志向',choice:'f'},
        {seeword:'了噢',choice:'j'},
        {seeword:'公益',choice:'f'},
    ],
    // 将呈现顺序设置为随机
    randomize_order:true
}
timeline.push(real_exercise);

// 结束语
var end = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: "非常感谢您的参与，按下空格或 5 秒后自动退出",
    trial_duration: 5000,
    response_ends_trial: true,
    choices: " ",
    extensions: [{type: Naodao}],
    data: {
    plugin_name: "end"
    }};
timeline.push(end);

// 退出全屏模式
var close_fullscreen = {
    type: jsPsychFullscreen,
    fullscreen_mode: false,
    delay_after: 0
}
timeline.push(close_fullscreen);

// 运行时间线
jsPsych.run(timeline)

