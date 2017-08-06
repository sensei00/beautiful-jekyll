
---
layout: post
title: Spring MVC 前后端数据交互总结
---




@()Spring MVC)[前端学习]

###和前台的交互
Spring MVC和前台的交互有两种：
![两种交互方式](/img/spring_mvc.png)


###使用key/value格式
Spring MVc中的视图解析器负责解析视图。使用时需要在config文件中进行配置。配置内容如下：

	<bean id= "viewResolver" class "org.springframework.web.servlet.view.InternalResourceViewResolver">
		<property name="perfix" value="/WEB-INF/jsp/"/>
		<property name="suffix" value=".jsp"/>
	</bean>
上面的配置信息中配置了前缀和后缀信息，所以view的路径可以缩短。比如原本是/WEB-INF/jsp/view.jsp。现在只需要携程view即可。下面是控制器中方法的写法，如果传的值是一般的参数的话则相对简单：


	//传入一般参数
    @RequestMapping(value="/Normal",produces="text/html;charset=UTF-8")
    public String normal(HttpServletRequest request,@RequestParam("username") String username,@RequestParam("password") String password){
        System.out.println("username:"+username+" password:"+password);
        request.setAttribute("info", "Normal server recv:"+username+" "+password);
        return "testPage.jsp";
    }

同时前段页面需要写一个form：

	<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
	<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
	<html>
	<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>测试数据交互</title>
	</head>
	<body>
    <form action="/normal" method="post">
        <table>
            <tr>
                <td>用户名:</td>
                <td><input name="username" size="15"></td>
            </tr>
            <tr>
                <td>密码:</td>
                <td><input name="password" size="15"></td>
            </tr>
            <tr>
                <td><button type="submit">提交</button></td>
                <td><button type="reset">重置</button></td>
            </tr>
        </table>
    </form>
    <span>服务器信息：${info}</span>
	</body>
	</html>
