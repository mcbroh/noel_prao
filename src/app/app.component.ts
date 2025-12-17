import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  showChatInput: boolean = true;
  isDragging = false;
  dragOffset = { x: 0, y: 0 };
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
