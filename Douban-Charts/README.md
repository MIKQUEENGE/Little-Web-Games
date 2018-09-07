# 豆瓣榜单

主要参考了[这个项目](https://github.com/ZhiguangXiong/SomethingFunny/tree/master/douban-movie)，为了更快的熟悉jQuery的使用。

[点这里在线查看效果](https://blog.zmj97.top/Little-Web-Projects/Douban-Charts/index.html)。



需要注意的是，有的榜单的API是需要`apikey`的，因此在需要提交的`data`中添加一条`apikey: '0b2bdeda43b5688921839c8ecb20399b'`，这样就可以顺利的获取数据了。



另外关于**下拉加载更多**，

参考的那个项目是利用的`$viewport.height() + $viewport.scrollTop() >= $content.height() - 80`来判断的，但是利用这个电影列表的索引数字会出现异常，

因此最后我还是利用了**点击加载更多**，在以后更深入地了解了JS的机制后再来修改这里。 



关于**onpopstate**，[这篇文章](https://www.w3cschool.cn/javascript_guide/javascript_guide-uz9v269y.html)和[这篇文章](http://www.php.cn/html5-tutorial-35102.html)讲解的较为清晰。我这里并没有实现这个功能。



比较短的榜单传入不同的参数用同一个函数实现，比较长的Top250和未定长度的搜索用同一个函数实现。



直接修改`top250`的`loadCount`可以改变**TOP250榜单**和**搜索**时每次获取数据的个数。



**关于API:**

TOP250 :  https://api.douban.com/v2/movie/top250 

搜索 ：https://api.douban.com/v2/movie/search

 豆瓣新片榜 ：https://api.douban.com/v2/movie/new_movies

一周口碑榜 ：https://api.douban.com/v2/movie/weekly

北美票房榜 ：https://api.douban.com/v2/movie/us_box