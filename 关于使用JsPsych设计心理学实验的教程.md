#  关于使用JsPsych设计心理学实验的教程

## 一、简介

​       JsPsych 是一个用JavaScript编写的库，旨在简化心理学实验的设计和实施。通过这个教程，我们将逐步讲解如何使用JsPsych创建一个心理学实验。以词汇识别任务为例，该实验包含采集被试信息、展示指导语、呈现实验刺激以及反馈等步骤。本教程将一步步讲解每个步骤，并提供代码示例，帮助您顺利完成实验设计。

------

## 二、准备工作

​      JsPsych = js + psych，其中js代表JavaScript，psych则代表心理学。JsPsych是一个编写在线心理学实验的工具包，它写出来的实验程序是运行在浏览器中的。如果我们需要使用JsPsych设计一个完整的心理学实验，需要准备以下几个文件：

### 所需文件

- **HTML文件**：用于在浏览器中展示实验界面。
- **CSS文件**：用于设置实验的样式。
- **JavaScript文件**：包含JsPsych实验代码。

### 介绍

- **HTML简介**：HTML的全称是**超文本标记语言**，它使用**标记标签**来描述网页，这些标签都是用<>括起来的，有的成对出现，如：`<p></p>`（段落）、`<h1></h1>`（一级标题），也有的单独出现，如：`<img>`（图片）。HTML负责的是网页整体的结构。

- **CSS简介**：CSS的作用是**给元素添加样式**，避免网页过于单一而丑陋，进一步美化这个网页，给被试呈现一个舒适美观的实验环境。

- **JavaScript简介**：JavaScript允许**用户和页面交互**。如果我们想要给我们目前正在制作的这个网页添加一个点击事件（在用户点击网页时执行某一功能），就需要使用到JavaScript。

  

  ------

  

## 三、代码编写

### ==**步骤1：创建HTML文件**==

​      和其他语言的开发不同，网页的制作并不需要特别的环境。可以使用记事本来撰写代码，修改后缀为.html，保存并双击在浏览器中打开即可。我们也可以使用VsCode这一款足够轻、又有着强大代码补全功能的编辑器来完成这一工作。

​     首先，我们到VsCode官网 [(https://code.visualstudio.com/)]()下载它的安装包并安装。为了提高我们的开发效率，我们还需要安装一些插件，可以使用Ctrl + Shift + L的快捷键来搜索插件。

| 插件名称                                                  | 插件功能                                     |
| :-------------------------------------------------------- | :------------------------------------------- |
| Chinese (Simplified) Language Pack for Visual Studio Code | 简体中文语言包                               |
| open in browser                                           | 使用Alt+B快捷键，在默认浏览器中打开.html文件 |

​      此外，我们还需要对VsCode再做一些额外的设置。在VsCode中设置代码自动换行的功能。步骤如下：**按快捷键Ctrl + Shift + P → 输入Toggle Word Wrap → 点击弹出的选项**

![image-20240723163054809](../../AppData/Roaming/Typora/typora-user-images/image-20240723163054809.png)

​      以上设置完毕后，我们可以直接通过Ctrl + N快捷键或点击**文件** → 点击**新建文件**创建所需HTML文件。接下来我们详细讲解HTML代码的撰写。

> 对于每一个HTML文件，其内容虽然各不相同，但是它们有都有共同的一部分结构，即HTML的初始代码。VsCode为我们提供了一个快速生成初始代码的功能。你只需要在新建的HTML文件中输入!（**注意一定是半角的!**，具体输入方法为，切换到英文输入法，再输入!)，然后点击Tab，就可以生成上面的内容。

​      本实验的网页代码如下所示：

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>JsPsych Experiment</title>
    <link rel="stylesheet" href="jspsych.css">
</head>
<body>
    <!-- Insert content here -->
    <div class="container">
        <div id="jspsych-target"></div>
    </div>
    <script src="jspsych.js"></script>
</body>
</html>
```

​               接下来我们将详细解释每行代码所代表的意思：

> 第1行的`<!DOCTYPE html>`，这一代码必须位于HTML文档的第一行，它的作用是指示HTML版本。
>
> 第2行的`<html lang="en">`是一个html标签，它是文档的**根元素**，将HTML内容包裹在其中。我们可以看到，它和代码中第15行的`</html>`构成一对标签。这里的**lang="en"**说明这是一个英文网页，如果你想要把它变为中文网页，可以将其换成`<html lang="zh">`。当然，这并不会自动把你的网页中的英文翻译成中文；其作用是告知搜索引擎这是中文站还是英文站。
>
> 第3行的`<head>`标签包含了文档的**元数据**，它和第8行的`</head>`组成<u>一对标签</u>。
>
> 第4行的`<meta charset="UTF-8">`说明当前**网页的编码**为utf-8。
>
> 第5行的 `<meta name="viewport" content="width=device-width, initial-scale=1.0">`: **设置视口的宽度等于设备宽度**，并初始化缩放级别为1.0，这样可以确保页面在不同设备上显示良好。
>
> 第6行的`<title>JsPsych Experiment</title>`标记当前**网页标题**为JsPsych Experiment。
>
> 第7行的`<link rel="stylesheet" href="jspsych.css">`: 链接**外部CSS文件**（`jspsych.css`），用于为<u>页面添加样式</u>。
>
>  第9行和第15行构成的`<body></body>`标签包裹了文档的主题，我们所要在页面中显示的内容就是在这里进行书写。
>
>  第10行还写了一行内容，但这行内容并没有显示在网页上。这行内容是**注释**，其作用是对我们的程序进行说明，而在程序运行的时候，这些内容不会被执行。写代码的时候，注释是必不可少的。在HTML中，我们用`<!-- -->`来进行注释。如我们前面所说的，可以使用Ctrl + /来进行/取消注释。
>
>  第11行的`<div class="container">`: 定义一个容器`div`，使用CSS类`container`，该类将在`jspsych.css`文件中定义样式。
>
> 第12行`<div id="jspsych-target"></div>`: 定义一个`div`，其`id`为`jspsych-target`。这个`div`将作为JsPsych实验显示内容的目标容器。
>
> 第13行`</div>`: 关闭容器`div`标签。
>
> 第14行`<script src="jspsych.js"></script>`: 链接外部JavaScript文件（`jspsych.js`），用于包含JsPsych实验的代码。

​            你可以根据你的实验设计修改以上代码中的具体内容。例如，我们可以修改`<title></title>`标签内的内容，来改变网页的标题。我们可以将里面的文字设置为我们想给被试呈现的实验名称，如“一个广告学心理学实验”。

### ### **==步骤2：设置CSS样式==**

​            前面创建的HTML文件是负责网页结构的，而如果要给网页添加样式，则要使用CSS，使网页更加舒适美观。CSS的基本格式为`selector { property1: value1; property2: value2; }`。selector即选择器，其作用是指定这条CSS规则应该被应用于哪些元素；而大括号内部的每一个属性，都是在说明具体应该对元素的哪方面做怎样的修饰。

​           以下是本实验的具体布局代码：

```css
/* 页面整体样式设置 */
body {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    margin: 0;
    font-size: 16px;
    font-family: 'Microsoft Himalaya', sans-serif;
}

/* 容器样式 */
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: 800px;
    padding: 20px;
    box-sizing: border-box;
}

/* jsPsych 显示元素样式 */
.jspsych-display-element {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 48px;
    font-family: 'Microsoft Himalaya';
}

/* 响应式设置 */
@media (max-width: 600px) {
    .container {
        padding: 10px;
    }
    .jspsych-display-element {
        font-size: 24px;
    }
}
```

​             接下来我们将详细解释每行代码所代表的意思： 

1. **页面整体样式设置部分**：这段代码定义了整个页面的基本样式，使内容居中对齐并设置字体样式。

> 第1行`/* 页面整体样式设置 */`: 注释，说明接下来的部分是对页面整体样式的设置。不同于HTML的注释，CSS的注释是使用`/* 注释的内容*/`完成的，也可以使用Ctrl + /的快捷键在VsCode中进行注释。第13、25、35行均为注释，说明该部分代码的内容。
>
> 第2行`body`:选择HTML文档的`<body>`元素。
>
> 第3行`display: flex;`: 将`<body>`元素设置为Flexbox布局，使其子元素可以灵活布局。
>
> 第4行`flex-direction: column;`: 将Flexbox布局方向设置为列，使子元素从上到下排列。
>
> 第5行`align-items: center;`: 水平居中对齐Flexbox子元素。
>
> 第6行`justify-content: center;`: 垂直居中对齐Flexbox子元素。
>
> 第7行`height: 100vh;`: 设置`<body>`元素的高度为视口高度的100%。
>
> 第8行`margin: 0;`: 移除`<body>`元素的默认外边距。
>
> 第9行`font-size: 16px;`: 设置字体大小为16像素。使用`font-size`可以调整字体大小，单位一般为`px`。
>
> 第10行`font-family: 'Microsoft Himalaya', sans-serif;`: 设置字体为'Microsoft Himalaya'，如果不可用则使用sans-serif字体。我们可以使用`font-family`属性控制字体名称，如果字体名称超过一个单词，应使用引号将其括起来；多种字体间用逗号隔开，为保证兼容性应包含多种字体。这里说明一点，如果是在**内联样式**中指定了字体名称，只要保证最外层的引号和`font-family`中使用的引号不同即可（一个用`"`，一个用`'`）。例如：`<div style="font-family: 'Times New Roman';"></div>`。

**2.容器样式设置部分**：这段代码为`.container`类定义了样式，使其内容居中对齐，宽度为100%但不超过800像素，并添加内边距。

> 第14行`.container`: 选择具有`container`类的元素。
>
> 第15、16、17、18行：解释均同页面整体样式设置部分第3、4、5、6行
>
> 第19行`width: 100%;`: 设置容器宽度为100%。
>
> 第20行`max-width: 800px;`: 设置容器最大宽度为800像素。
>
> 第21行`padding: 20px;`: 设置容器的内边距为20像素。
>
> 第22行`box-sizing: border-box;`: 设置盒子模型为border-box，含内边距和边框在内的总宽度和高度。

3. **jsPsych 显示元素样式** ：这段代码为`.jspsych-display-element`类定义了样式，使其内容居中对齐，并设置字体大小和字体样式。

> 第26行`.jspsych-display-element`: 选择具有`jspsych-display-element`类的元素。
>
> 第27、28、29、30行：解释均同页面整体样式设置部分第3、4、5、6行
>
> 第31行`font-size: 48px;`: 设置字体大小为48像素。
>
> 第32行`font-family: 'Microsoft Himalaya';`: 设置字体为'Microsoft Himalaya'。

**4.响应式设置部分**：这段代码通过媒体查询实现了响应式设计，当视口宽度小于600像素时，调整`.container`的内边距和`.jspsych-display-element`的字体大小。

> 第36行`@media (max-width: 600px) { ... }`: 媒体查询，当视口宽度小于等于600像素时，应用内部的样式规则。
>
> 第38行`padding: 10px;`: 当视口宽度小于600像素时，将容器的内边距设置为10像素。
>
> 第40行`.jspsych-display-element`: 选择具有`jspsych-display-element`类的元素。

------

### ### **==步骤3：编写JsPsych实验代码==**

​        主要使用的主要代码有：

> **if...else...分支语句**：`if (condition) { statement1 } else { statement2 }`：如果`condition`为`true`，则运行`statement1`，否则运行`statement2`

> **注释**：在VsCode中使用单行注释的快捷键仍然是Ctrl + /，而多行注释的快捷键则是Alt + Shift + A。

> **加载插件**：extensions

> **定义实验结束时的回调函数**：`on_finish: function() { ... }

>  **定义要执行的函数**：func: function() { ... }`

> **设置变量名**：`data: { varname: 'pername' }`

​         首先，使用以下代码来**初始化并运行实验**：

```javascript
// 初始化 jsPsych
var jsPsych = initJsPsych({
    extensions: [{type: Naodao}],
    override_safe_mode: true,
    on_finish: function() {
        jsPsych.data.get().localSave('csv', `data_exp_demo_${subID}.csv`);
        document.getElementById('jspsych-content').innerHTML += '实验结束，感谢您的参与！';
    }
});
```

> 第1行// 初始化 jsPsych：**注释**
>
> 第2行`var jsPsych = initJsPsych({ ... });`: 初始化JsPsych实验，创建一个`jsPsych`对象。
>
> 第3行`extensions: [{type: Naodao}]`: **加载扩展插件**，借助脑岛平台。
>
> 第4行`override_safe_mode: true`: 允许覆盖安全模式设置。
>
> 第5行`on_finish: function() { ... }`: **定义实验结束时的回调函数**。
>
> 第6行`jsPsych.data.get().localSave('csv', `data_exp_demo_${subID}.csv`);`: 实验结束时，将**数据保存为CSV文件**。可以设置为我们想保存的数据文件格式。
>
> 第7行`document.getElementById('jspsych-content').innerHTML += '实验结束，感谢您的参与！';`: 在页面上显示实验结束的感谢信息。该代码设置了**页面结束的信息**。

​        接下来我们需要为被试生成一个**随机的实验编号**，并**初始化时间线数组`timeline`**，用于存储实验的各个阶段。

```javascript
// 为被试生成随机实验编号
const subID = jsPsych.randomization.randomID(8);
var timeline = [];
```

>  第2行`const subID = jsPsych.randomization.randomID(8);`: 生成一个8位的随机实验编号，并将其赋值给`subID`变量。
>
> 第3行`var timeline = [];`: 创建一个空数组`timeline`，用于存储实验的各个阶段（任务）。

**1.设置实验步骤**

***1)设置实验过程中HTML页面的样式***

```javascript
// 设置 HTML 样式
var set_html_style_EAST = {
    type: jsPsychCallFunction,
    func: function() {
        document.body.style.backgroundColor = 'black';
        document.body.style.color = 'white';
        document.body.style.fontSize = '36px';
        document.body.style.fontFamily = 'Microsoft Himalaya';
        document.body.style.cursor = 'none';
    },
};
```

其中各行代码的意思如下：

> 第2行`var set_html_style_EAST = { ... };`: 定义一个对象`set_html_style_EAST`，用于设置HTML页面的样式。
>
> 第3行`type: jsPsychCallFunction`: 指定该任务类型为**调用函数**。
>
> 第4行`func: function() { ... }`: **定义要执行的函数**。
>
> 第5行`document.body.style.backgroundColor = 'black';`: 设置**页面背景色**为黑色。
>
> 第6行`document.body.style.color = 'white';`: 设置**文字颜色**为白色。
>
> 第7行`document.body.style.fontSize = '36px';`: 设置**字体大小**为36像素。
>
> 第8行`document.body.style.fontFamily = 'Microsoft Himalaya';`: 设置**字体**为'Microsoft Himalaya'。
>
> 第9行`document.body.style.cursor = 'none';`: 隐藏**鼠标指针**。

***2)打开全屏模式，并显示全屏提示信息，指导被试如何准备实验环境***

```javascript
// 打开全屏模式
var open_fullscreen = {
    type: jsPsychFullscreen,
    fullscreen_mode: true,
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
};
timeline.push(open_fullscreen);
```

其中各行代码的意思如下：

> 第2行`var open_fullscreen = { ... };`: 定义一个对象`open_fullscreen`，用于**打开全屏模式**。
>
> 第3行`type: jsPsychFullscreen`: 指定该任务类型为**全屏模式**。
>
> 第4行`fullscreen_mode: true`: **启用全屏模式**。
>
> 第5行`message: ...`: 定义全屏模式下显示的**提示信息**，包含实验注意事项和全屏开始按钮。
>
> 第18行`button_label: '点击这里全屏开始'`: 定义全屏模式按钮的**标签**。
>
> 第19行`delay_after: 100`: **全屏模式启动后延迟100毫秒**。
>
> 第21行`timeline.push(open_fullscreen);`: **将`open_fullscreen`任务添加到时间线`timeline`中**。

***3)采集被试的基本信息，如姓名和实验编号***

```javascript
// 采集被试信息
var pername = {
    type: jsPsychSurveyText,
    questions: [
        {prompt: '<p style="font: 16pt 微软雅黑">您的姓名是</p>'},
        {prompt: '<p style="font: 16pt 微软雅黑">您的实验编号是</p>'}
    ],
    data: { varname: 'pername' },
    button_label: '继续',
};
timeline.push(pername);
```

其中各行代码的意思如下：

> 第2行`var pername = { ... };`: 定义一个对象`pername`，用于**采集被试信息**。
>
> 第3行`type: jsPsychSurveyText`: 指定该任务类型为**文本调**查。
>
> 第4行`questions: [ ... ]`: 定义**调查问题数组**。
>
> 第5行`{prompt: '<p style="font: 16pt 微软雅黑">您的姓名是</p>'}`: 第一问题，询问**被试的姓名**。
>
> 第6行`{prompt: '<p style="font: 16pt 微软雅黑">您的实验编号是</p>'}`: 第二问题，询问**被试的实验编号**。可以修改为其他信息，如`{prompt: '<p style="font: 16pt 微软雅黑">您的专业是</p>'}`为询问被试的专业名称。
>
> 第7行`data: { varname: 'pername' }`: 设置收集的**数据变量名**为`pername`。
>
> 第8行`button_label: '继续'`: 定义按钮标签为“继续”。
>
> 第11行`timeline.push(pername);`: 将`pername`任务添加到时间线`timeline`中。

***4)实验的指导语，说明了实验的操作方法和按键规则***

```javascript
// 指导语
var ins_1 = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `<p style="font: 16pt 微软雅黑; text-align: left; line-height: 1.6em">
    实验开始时会在屏幕中央出现一个<span style="color:#FF0000">"+"</span>，请您集中注意注视它。<br/>
    <br/><br/>
    很快它将会被两个文字代替，请您认真阅读，并又快又准确地判断<span style="color:#FF0000">这两个字能否构成一个有意义的词语</span>。<br/>
    若能，请按<span style="color:#FF0000">‘F’</span>键；若不能，请按<span style="color:#FF0000">‘J’</span>键。<br/>
    <br/><br/>
    如果您已经明白以上指导语，请按空格键开始进行练习实验
    </p>`,
    choices: [' '],
};
timeline.push(ins_1);
```

其中各行代码的意思如下：

> 第2行`var ins_1 = { ... };`: 定义一个对象`ins_1`，用于**展示指导语**。
>
> 第3行`type: jsPsychHtmlKeyboardResponse`: 指定该任务类型为**HTML键盘响应**。
>
> 第4行`stimulus: ...`: **定义指导语内容**，解释实验任务和按键操作。
>
> 第12行`choices: [' ']`: 设置可接受的按键响应为**空格键**。
>
> 第14行`timeline.push(ins_1);`: **将`ins_1`任务添加到时间线`timeline`中**。

**2.实验主要部分**

***1）比较按键响应***

```javascript
// 比较按键响应。如果按键一致则返回正确
function compare_keys(data) {
    data.correct = jsPsych.pluginAPI.compareKeys(data.response, data.correct_answer);
}
```

> 第2行`function compare_keys(data) { ... }`: 定义一个函数`compare_keys`，用于**比较按键响应**。
>
> 第3行`data.correct = jsPsych.pluginAPI.compareKeys(data.response, data.correct_answer);`: **比较参与者的响应与正确答案是否一致**，并设置`data.correct`为布尔值。

***2）显示第一个注视点***

```javascript
// 注视点显示
var fixation = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: '<div style="font-size:60px;">+</div>',
    choices: "NO_KEYS",
    trial_duration: 800,
    post_trial_gap: 0,
    response_ends_trial: false,
    data: {
        plugin_name: "fixation"
    }
};
```

> 第2行`var fixation = { ... };`: 定义一个对象`fixation`，用于**显示注视点**。
>
> 第3行`type: jsPsychHtmlKeyboardResponse`: 指定该任务类型为**HTML键盘响应**。
>
> 第4行`stimulus: '<div style="font-size:60px;">+</div>'`: 设置**注视点**为一个大号的“+”符号。
>
> 第5行`choices: "NO_KEYS"`: **不允许按键响应**。
>
> 第6行`trial_duration: 800`: 设置**试验持续时间为800毫秒**。
>
> 第7行`post_trial_gap: 0`: 设置**试验结束后的间隔时间为0毫秒**。
>
> 第8行`response_ends_trial: false`: 设置**按键响应不会结束试验**。
>
> 第9行`data: { plugin_name: "fixation" }`: 设置**数据变量名**为`fixation`。

***3）提供反馈***

```javascript
// 提供反馈
var feed = {
    type: jsPsychCategorizeHtml,
    stimulus: jsPsych.timelineVariable('seeword'),
    stimulus_duration: 3000,
    trial_duration: 3000,
    choices: ['f', 'j'],
    key_answer: jsPsych.timelineVariable('choice'),
    correct_text: '<p style="font: 24pt 微软雅黑; color: green;">回答正确</p>',
    incorrect_text: '<p style="font: 24pt 微软雅黑; color: red;">回答错误</p>',
    feedback_duration: 2000,
    post_trial_gap: 600,
    timeout_message: '<p style="font: 24pt 微软雅黑">请尽快作出判断并按键</p>',
    data: {
        plugin_name: "feed",
        correct_choice: jsPsych.timelineVariable("choice"),
    }
};
```

> 第2行`var feed = { ... };`: 定义一个对象`feed`，用于提供反馈。
>
> 第3行`type: jsPsychCategorizeHtml`: 指定该任务类型为分类HTML。
>
> 第4行`stimulus: jsPsych.timelineVariable('seeword')`: 设置**刺激为时间线变量`seeword`**。
>
> 第5行`stimulus_duration: 3000`: 设置**刺激持续时间**为3000毫秒。
>
> 第6行`trial_duration: 3000`: 设置**试验持续时间**为3000毫秒。
>
> 第7行`choices: ['f', 'j']`: 设置**可接受的按键响应为`f`和`j`键**。
>
> 第8行`key_answer: jsPsych.timelineVariable('choice')`: 设置**正确答案为时间线变量`choice`**。
>
> 第9行`correct_text: '<p style="font: 24pt 微软雅黑; color: green;">回答正确</p>'`: 定义**回答正确时的反馈文本**。
>
> 第10行`incorrect_text: '<p style="font: 24pt 微软雅黑; color: red;">回答错误</p>'`: 定义**回答错误时的反馈文本**。
>
> 第11行`feedback_duration: 2000`: 设置**反馈持续时间**为2000毫秒。
>
> 第12行`post_trial_gap: 600`: 设置**试验结束后的间隔时间**为600毫秒。
>
> 第13行`timeout_message: '<p style="font: 24pt 微软雅黑">请尽快作出判断并按键</p>'`: 定义**超时信息**。
>
> 第14~16行`data: { plugin_name: "feed", correct_choice: jsPsych.timelineVariable("choice") }`: 设置**数据变量**名为`feed`，并**记录正确答案**。

***4）练习阶段***

```javascript
// 练习阶段
var exercise = {
    timeline: [fixation, feed],
    timeline_variables: [
        {seeword: '类的', choice: 'j'},
        {seeword: '天空', choice: 'f'},
        {seeword: '山脚', choice: 'f'},
        {seeword: '卡南', choice: 'j'},
        {seeword: '花朵', choice: 'f'},
        {seeword: '立刻', choice: 'f'}
    ],
    randomize_order: true,
    data: {
        plugin_name: "test",
        correct_answer: jsPsych.timelineVariable("choice"),
        namewrtie: jsPsych.timelineVariable
    }
};
```

> 第2行`var exercise = { ... };`: 定义一个对象`exercise`，用于**练习阶段**。
>
> 第3行`timeline: [fixation, feed]`: 设置**时间线包含注视点显示和反馈任务**。
>
> 第4行`timeline_variables: [ ... ]`: 定义**时间线变量数组**。
>
> 第5~10行`{seeword: '类的', choice: 'j'}`: 第一刺激，文字为'类的'，正确答案为'j'键。
>
> `{seeword: '天空', choice: 'f'}`: 第二刺激，文字为'天空'，正确答案为'f'键。
>
> `{seeword: '山脚', choice: 'f'}`: 第三刺激，文字为'山脚'，正确答案为'f'键。
>
> `{seeword: '卡南', choice: 'j'}`: 第四刺激，文字为'卡南'，正确答案为'j'键。
>
> `{seeword: '花朵', choice: 'f'}`: 第五刺激，文字为'花朵'，正确答案为'f'键。
>
> `{seeword: '立刻', choice: 'f'}`: 第六刺激，文字为'立刻'，正确答案为'f'键。
>
> 第12行`randomize_order: true`: 设置**刺激呈现顺序随机**。
>
> 第13~17行`data: { plugin_name: "test", correct_answer: jsPsych.timelineVariable("choice"), namewrtie: jsPsych.timelineVariable }`: 设置**数据变量名**为`test`，**记录正确答案和其他变量**。

***5）重复练习阶段***

```JavaScript
// 重复练习
var repeatr = {
    type: jsPsychHtmlKeyboardResponse,
    choices: ['q', ' '],
    stimulus: '<p style="font: 24pt 微软雅黑; ">若要继续进行练习请按Q键；若要开始实验请按下空格键</p>',
    data: {
        correct_response: 'q',
    },
    on_finish: function(data) {
        if(jsPsych.pluginAPI.compareKeys(data.response, data.correct_response)){
            data.correct = true;
        } else {
            data.correct = false;
        }
    }
};
```

> 第2行`var repeatr = { ... };`: 定义一个对象`repeatr`，用于**重复练习**阶段。
>
> 第3行`type: jsPsychHtmlKeyboardResponse`: 指定该任务类型为**HTML键盘响应**。
>
> 第4行`choices: ['q', ' ']`: 设置**可接受的按键响应**为`q`键和空格键。
>
> 第5行`stimulus: '<p style="font: 24pt 微软雅黑; ">若要继续进行练习请按Q键；若要开始实验请按下空格键</p>'`: 定义**刺激内容**，**提示继续练习或开始实验**。
>
> 第6~8行`data: { correct_response: 'q' }`: 设置**数据变量名**为`repeatr`，并**记录正确答案**为`q`键。
>
> 第9行`on_finish: function(data) { ... }`: 定义**任务结束时的回调函数**。
>
> 第10行`if(jsPsych.pluginAPI.compareKeys(data.response, data.correct_response)){ data.correct = true; } else { data.correct = false; }`: **比较参与者的响应与正确答案是否一致，并设置`data.correct`为布尔值**。

***6）循环节点***

```javascript
// 循环节点。根据上一个的反应判断（是否正确）是否需要循环时间线[exercise, repeatr]
var loop_node = {
    timeline: [exercise, repeatr],
    loop_function: function(data) {
        if(jsPsych.data.get().last(1).values()[0].correct){
            return true;
        } else {
            return false;
        }
    }
};
timeline.push(loop_node);
```

> 第2行`var loop_node = { ... };`: 定义一个对象`loop_node`，用于**创建循环节点**。
>
> 第3行`timeline: [exercise, repeatr]`: 设置**循环时间线包含练习阶段和重复练习任务**。
>
> 第4行`loop_function: function(data) { ... }`: 定义**循环条件函数**。
>
> 第5~9行`if(jsPsych.data.get().last(1).values()[0].correct){ return true; } else { return false; }`: 根据上一个任务的响应**判断是否需要重复练习**，正确返回`true`，否则返回`false`。
>
> 第12行`timeline.push(loop_node);`: **将`loop_node`任务添加到时间线`timeline`中**。

***7）设置第二个注视点***

```javascript
// 注视点显示
var fixation2 = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: '<div style="font-size:60px;">+</div>',
    choices: "NO_KEYS",
    trial_duration: 800,
    post_trial_gap: 0,
    response_ends_trial: false,
    data: {
        plugin_name: "fixation2"
    }
};
```

> 第2行`var fixation2 = { ... };`: 定义一个对象`fixation2`，用于**显示第二个注视点**。
>
> 第3行`type: jsPsychHtmlKeyboardResponse`: 指定该任务类型为**HTML键盘响应**。
>
> 第4行`stimulus: '<div style="font-size:60px;">+</div>'`: 设置**注视点**为一个大号的“+”符号。
>
> 第5行`choices: "NO_KEYS"`: 不允许按键响应。
>
> 第6行`trial_duration: 800`: 设置试验持续时间为800毫秒。
>
> 第7行`post_trial_gap: 0`: 设置试验结束后的间隔时间为0毫秒。
>
> 第8行`response_ends_trial: false`: 设置按键响应不会结束试验。
>
> 第8行`data: { plugin_name: "fixation2" }`: 设置数据变量名为`fixation2`。

***8）正式实验阶段***

```javascript
// 实验词汇判断任务
var real_word = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: jsPsych.timelineVariable('seeword'),
    stimulus_duration: 3000,
    trial_duration: 3000,
    post_trial_gap: 600,
    choices: ['f', 'j'],
    data: {
        plugin_name: "real_word",
        correct_answer: jsPsych.timelineVariable("choice"),
    },
    on_finish: compare_keys
};
```

> 第2行`var real_word = { ... };`: 定义一个对象`real_word`，用于**正式实验词汇判断任务**。
>
> 第3行`type: jsPsychHtmlKeyboardResponse`: 指定该任务类型为**HTML键盘响应**。
>
> 第4行`stimulus: jsPsych.timelineVariable('seeword')`: 设置**刺激为时间线变量`seeword`**。
>
> 第5行`stimulus_duration: 3000`: 设置**刺激持续时间**为3000毫秒。
>
> 第6行`trial_duration: 3000`: 设置**试验持续时间**为3000毫秒。
>
> 第7行`post_trial_gap: 600`: 设置**试验结束后的间隔时间**为600毫秒。
>
> 第8行`choices: ['f', 'j']`: 设**置可接受的按键响应**为`f`和`j`键。
>
> 第9行`data: { plugin_name: "real_word", correct_answer: jsPsych.timelineVariable("choice") }`: 设置**数据变量**名为`real_word`，并**记录正确答案**。
>
> 第13行`on_finish: compare_keys`: 设置**任务结束时调用`compare_keys`函数**。

***9）实验刺激/材料***

```javascript
var real_exercise = {
    timeline: [fixation2, real_word],
    timeline_variables: [
        {seeword: '它事', choice: 'j'},
        {seeword: '骑车', choice: 'f'},
        {seeword: '追求', choice: 'f'},
        {seeword: '志向', choice: 'f'},
        {seeword: '了噢', choice: 'j'},
        {seeword: '公益', choice: 'f'},
        {seeword: '骑车', choice: 'f'},
        {seeword: '当然', choice: 'f'},
        {seeword: '丘戈', choice: 'j'},
        {seeword: '和谐', choice: 'f'},
        {seeword: '春天', choice: 'f'},
        {seeword: '补垂', choice: 'j'},
        {seeword: '阳光', choice: 'f'},
        {seeword: '家庭', choice: 'f'},
        {seeword: '凌殳', choice: 'j'},
        {seeword: '友情', choice: 'f'},
        {seeword: '创新', choice: 'f'},
        {seeword: '一风', choice: 'j'},
        {seeword: '知识', choice: 'f'},
        {seeword: '自由', choice: 'f'},
        {seeword: '说个', choice: 'j'},
        {seeword: '科技', choice: 'f'},
        {seeword: '友谊', choice: 'f'},
        {seeword: '按类', choice: 'j'},
        {seeword: '勇气', choice: 'f'},
        {seeword: '诚信', choice: 'f'},
        {seeword: '我离', choice: 'j'},
        {seeword: '环保', choice: 'f'},
        {seeword: '文化', choice: 'f'},
        {seeword: '拉卡', choice: 'j'},
        {seeword: '山川', choice: 'f'},
        {seeword: '河流', choice: 'f'},
        {seeword: '哦傲', choice: 'j'},
        {seeword: '爱心', choice: 'f'},
        {seeword: '责任', choice: 'f'},
        {seeword: '闹是', choice: 'j'},
        {seeword: '发展', choice: 'f'},
        {seeword: '创造', choice: 'f'},
        {seeword: '使而', choice: 'j'},
        {seeword: '信仰', choice: 'f'},
        {seeword: '劳动', choice: 'f'},
        {seeword: '放类', choice: 'j'},
        {seeword: '奉献', choice: 'f'},
        {seeword: '尊严', choice: 'f'},
        {seeword: '拍排', choice: 'j'},
        {seeword: '绿色', choice: 'f'},
        {seeword: '科学', choice: 'f'},
        {seeword: '解可', choice: 'j'},
        {seeword: '追求', choice: 'f'},
        {seeword: '志向', choice: 'f'},
        {seeword: '了噢', choice: 'j'},
        {seeword: '公益', choice: 'f'}
    ],
    randomize_order: true
};
timeline.push(real_exercise);
```

> 第1行`var real_exercise = { ... };`: 定义一个对象`real_exercise`，用于实验任务。
>
> 第2行`timeline: [fixation2, real_word]`: 设置**时间线包含第二个注视点显示和实验词汇判断任务**。
>
> 第3行`timeline_variables: [ ... ]`: : 定义**时间线变量数组**。
>
> 第4~55行`{seeword: '它事', choice: 'j'}`: **所有刺激的具体内容**，正确为f，错误为j。
>
> 第57行`randomize_order: true`: 设置**刺激呈现顺序随机**。
>
> 第59行`timeline.push(real_exercise);`: **将`real_exercise`任务添加到时间线`timeline`中**。

***10）结束语***

```javascript
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
    }
};
timeline.push(end);
```

> 第2行`var end = { ... };`: 定义一个对象`end`，用于**显示实验结束语**。
>
> 第3行`type: jsPsychHtmlKeyboardResponse`: 指定该任务类型为**HTML键盘响应**。
>
> 第4行`stimulus: "非常感谢您的参与，按下空格或 5 秒后自动退出"`: 定义**结束语内容**，感谢参与者并提示按下空格或5秒后自动退出。
>
> 第5行`trial_duration: 5000`: 设置**试验持续时间**为5000毫秒。
>
> 第6行`response_ends_trial: true`: 设置**按键响应结束试验**。
>
> 第7行`choices: " "`: 设置可**接受的按键响应**为空格键。
>
> 第8行`extensions: [{type: Naodao}]`: 加载**脑岛插件**。
>
> 第9~11行`data: { plugin_name: "end" }`: 设置**数据变量名**为`end`。
>
> 第13行`timeline.push(end);`: 将**`end`任务添加到时间线`timeline`中**。

***11）退出全屏模式***

```javascript
// 退出全屏模式
var close_fullscreen = {
    type: jsPsychFullscreen,
    fullscreen_mode: false,
    delay_after: 0
};
timeline.push(close_fullscreen);
```

> 第2行`var close_fullscreen = { ... };`: 定义一个对象`close_fullscreen`，用于退出全屏模式。
>
> 第3行`type: jsPsychFullscreen`: 指定该任务类型为全屏模式。
>
> 第4行`fullscreen_mode: false`: 退出全屏模式。
>
> 第5行`delay_after: 0`: 设置退出全屏模式后没有延迟。
>
> 第7行`timeline.push(close_fullscreen);`: 将`close_fullscreen`任务添加到时间线`timeline`中。

***12）运行时间线***

```javascript
// 运行时间线
jsPsych.run(timeline);
```

> 第2行`jsPsych.run(timeline);`: 运行时间线`timeline`进行实验。

​        以上这个JavaScript文件包含了实验的完整逻辑，包括初始化JsPsych、设置时间线、显示指导语、呈现刺激、提供反馈以及记录数据等。

------

## 四、运行实验

​          将所有文件放在同一目录下，通过浏览器打开`index.html`文件即可运行实验。确保浏览器支持JavaScript，并推荐使用Chrome、Edge、Firefox或Safari。确保实验程序无误后可将链接转发给被试进行实验。

## 五、总结

​         通过本教程，您已经学会了如何使用JsPsych设计一个词汇识别任务的心理学实验，希望本教程对您有所帮助，祝您实验设计顺利！

​         [项目链接](https://github.com/Peace-jane-dawn/Cheese-bar)

