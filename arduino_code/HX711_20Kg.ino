#include<Servo.h>
#include "HX711.h"
float Weight = 0;
Servo up,down;      
int a=90,b=90;    //上下舵机初始角度

void setup()
{
	Init_Hx711();				//初始化HX711模块连接的IO设置
  pinMode(Fan,OUTPUT);
	Serial.begin(9600);
	Get_Maopi();		//获取毛皮
  up.attach(10,1000,2000);        //上面的舵机附加到引脚10      
  down.attach(9,1000,2000);       //下面的舵机附加到引脚9
  up.write(a);                   //上面的舵机初始角度为60° 
  down.write(b);                 //下面的舵机初始角度为30°
}

void loop()
{
	Weight = Get_Weight();	//计算放在传感器上的重物重量
  Weight = Weight/1000 + 0.02;
	Serial.print(Weight,3);	//串口显示重量
  if(Weight > 5) digitalWrite(Fan,HIGH);
  if(Weight < 5) digitalWrite(Fan,LOW);
	Serial.print(" kg\n");	//显示单位
	delay(2000);				//延时2s
  while(Serial.available() > 0)     //当Serial.available()>0时，说明串口接收到了数据，可以读取。     
  {
    char flag=Serial.read();
    delay(2);
     if(flag=='1'&&a<=180&&b<=180)     //当串口输入‘1’时，上舵机向上转动5°
     {
          a=a+45;
          b=b+45;
     }
     if(flag=='0'&&a>=0&&b>=0)    //当串口输入‘0’时，上舵机向下转动5°
     {  
        a=a-45;
        b=b-45;
     }
  }
  up.write(a);
  down.write(b);
}
