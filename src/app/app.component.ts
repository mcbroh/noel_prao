import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  showChatInput: boolean = true;
  isDragging = false;
  dragOffset = { x: 0, y: 0 };
  userInput = '';
  isLoading = false;
  messages: { text: string; time: string; isAi: boolean }[] = [];
  aiResponses = [
    'I can help you with that! Let me check the details for you.',
    'Thanks for reaching out! I\'m looking into this right now.',
    'Got it! I\'ll assist you with your request.',
    'I understand. Let me find the best solution for you.',
    'Great question! Here\'s what I found for you.'
  ];
  mvp = {
    name: 'Lebron James',
    team: 'Los Angeles Lakers',
    position: 'Small Forward',
    championships: 4,
    mvps: 4,
    age: 39,
  };

  title = 'Lebron raymone james sr';

  onIncreaseMVPs() {
    this.mvp.mvps += 1;
  }

  onIncreaseAge() {
    this.mvp.age += 1;
  }

  sendMessage() {
    this.showChatInput = true;
  }

  sendUserMessage() {
    if (this.userInput.trim() && !this.isLoading) {
      const now = new Date();
      const time = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
      this.messages.push({ text: this.userInput, time, isAi: false });
      this.userInput = '';
      this.isLoading = true;
      setTimeout(() => {
        const chatBox = document.getElementById('chat-box');
        if (chatBox) chatBox.scrollTop = chatBox.scrollHeight;
      }, 0);
      
      const delay = 4000 + Math.random() * 1000;
      setTimeout(() => {
        const aiTime = new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
        const randomResponse = this.aiResponses[Math.floor(Math.random() * this.aiResponses.length)];
        this.messages.push({ text: randomResponse, time: aiTime, isAi: true });
        this.isLoading = false;
        setTimeout(() => {
          const chatBox = document.getElementById('chat-box');
          if (chatBox) chatBox.scrollTop = chatBox.scrollHeight;
        }, 0);
      }, delay);
    }
  }

  closeForm() {
    this.showChatInput = false;
  }

  startDrag(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (target.tagName === 'INPUT' || target.tagName === 'BUTTON' || target.closest('button')) {
      return;
    }
    this.isDragging = true;
    const popup = document.getElementById('myForm');
    if (popup) {
      const rect = popup.getBoundingClientRect();
      this.dragOffset.x = event.clientX - rect.left;
      this.dragOffset.y = event.clientY - rect.top;

      // Set explicit position to prevent stretching when bottom/right are unset
      popup.style.left = `${rect.left}px`;
      popup.style.top = `${rect.top}px`;
      popup.style.bottom = 'auto';
      popup.style.right = 'auto';
    }
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (this.isDragging) {
      const popup = document.getElementById('myForm');
      if (popup) {
        popup.style.left = (event.clientX - this.dragOffset.x) + 'px';
        popup.style.top = (event.clientY - this.dragOffset.y) + 'px';
      }
    }
  }

  @HostListener('document:mouseup')
  onMouseUp() {
    this.isDragging = false;
  }
}
