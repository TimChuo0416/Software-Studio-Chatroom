# Software Studio 2023 Spring Midterm Project

### Scoring

| **Basic components**                             | **Score** | **Check** |
| :----------------------------------------------- | :-------: | :-------: |
| Membership Mechanism                             | 15%       | Y         |
| Firebase page                                    | 5%        | Y         |
| Database read/write                              | 15%       | Y         |
| RWD                                              | 15%       | Y         |
| Chatroom                                         | 20%       | Y         |

| **Advanced tools**                               | **Score** | **Check** |
| :----------------------------------------------- | :-------: | :-------: |
| Using React                                      | 10%       | Y         |
| Third-Party Sign In                              | 1%        | Y         |
| Notification                                     | 5%        | Y         |
| CSS Animation                                    | 2%        | Y         |
| Security                                         | 2%        | Y         |

| **Other useful functions**                         | **Score** | **Check** |
| :----------------------------------------------- | :-------: | :-------: |
| Name of functions                                  | 1~5%     | Y        |


---

### How to use 

    Describe how to use your web and maybe insert images or gifs to help you explain.
    
#### 登入頁面
![](https://i.imgur.com/LiKaLxI.png)

預設是login，橘紅色按鈕可以以Google帳戶登入，若無帳號則按下下面的Sign up，卡片會有翻面動畫，並轉換成註冊頁面。

#### 註冊頁面

![](https://i.imgur.com/tq68aix.png)


第一行為username，與其他用戶聊天時會顯示此名字，第二三行是Email與密碼，按下Sign up按鈕即可註冊。若按下下方的Log in則會翻面變回Log in頁面

#### Chatroom

![](https://i.imgur.com/H5KeIDA.png)

**成功登入後會跳出Chrome Notification。**

左半邊是聊天室的List，最下面的按鈕Add Chats可以新增聊天室，而'+'按鈕則可以邀請用戶進入當前聊天室(在public無作用)，若用戶不存在則會跳出警告。

右半部則會從database讀取並顯示目前聊天室的聊天紀錄，自己的訊息在右邊而別人的則在左邊，右下角則可以打字並發送訊息。


訊息會顯示時間，用戶名。在中間的則是系統訊息，在創建聊天室或邀請別人進聊天室時會發送。

### Function description

    Describe your bonus function and how to use it.
    
#### 刪除訊息

刪除訊息，在自己傳的訊息按下滑鼠後會跳出確認視窗詢問你是否要收回訊息，按下確認之後訊息便會收回並替代為message been deleted.

#### 個人檔案&照片

登入之後按下右上角的按鈕會在Chatroom和Profile中切換，Profile裡面顯示了帳戶的email、username和個性簽名。按下個性簽名會跳出方格可以更改自己的個性簽名，

個人照片的部分點選圖片(預設是空的)則可以上傳自己想要的照片，網站會進入載入畫面，再回去就可以看到圖片了。

![](https://i.imgur.com/gwaeseD.png)

### Firebase page link

    Your web page URL
#### https://chatroom-project-e0a86.web.app/

### Others (Optional)

    Anything you want to say to TAs.

<style>
table th{
    width: 100%;
}
</style>