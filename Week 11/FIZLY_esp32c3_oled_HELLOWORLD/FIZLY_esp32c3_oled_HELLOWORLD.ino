/*
  DN1010 Experimental Interaction, Ashley Hi 2026
  Week 11 - Physical Computing
  ESP32-C3 OLED Example - Customized for Assignment
*/

// ====== Reference Libraries ======
#include <Arduino.h>
#include <U8g2lib.h>
#include <Wire.h>

// ====== Set OLED Pins ======
#define SDA_PIN 5
#define SCL_PIN 6

// Initialize the 0.42" OLED display
U8G2_SSD1306_72X40_ER_F_HW_I2C u8g2(U8G2_R0, /* reset=*/ U8X8_PIN_NONE); 

void setup(void) {
  Wire.begin(SDA_PIN, SCL_PIN);
  u8g2.begin();
}

void loop(void) {
  u8g2.clearBuffer(); 
  
  u8g2.setFont(u8g2_font_logisoso16_tf); 

  u8g2.drawStr(0, 18, "I LOVE"); 
  u8g2.drawStr(0, 38, "CODING!"); 

  u8g2.sendBuffer();                 
  delay(1000);  
}