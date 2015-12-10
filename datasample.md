

valide response

```json

{
    "cas:serviceResponse": {
        "$": {
            "xmlns:cas": "https://passport.ustc.edu.cn"
        },
        "cas:authenticationSuccess": {
            "cas:user": "用户名（工资号，学号）",
            "attributes": {
                "cas:email": "电子邮件",
                "cas:name": "张三",
                "cas:zjhm": "pb99001001",
                "cas:gid": "10digi"
            }
        }
    }
}
```

invalid ticket:
```json
{
    "cas:serviceResponse": {
        "$": {
            "xmlns:cas": "https://passport.ustc.edu.cn"
        },
        "cas:authenticationFailure": {
            "_": "\r\n   Ticket ST-fd3f7afd39f379eee00cd4fc578029a7 not recognized\r\n",
            "$": {
                "code": "INVALID_TICKET"
            }
        }
    }
}
```
