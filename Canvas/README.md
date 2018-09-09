# Canvas

极其简单的画板，只是为了熟悉一下canvas。

暂时只支持电脑端。

为了坐标获取的准确性，canvas的大小应该在HTML中为canvas添加width和height属性实现。

若用`$('#canvas')`获取canvas，则直接`.getContext('2d')`是不存在的，而应该为``$('#canvas')[0].getContext('2d')`。

橡皮的实现为将画笔颜色调整为画布背景色。