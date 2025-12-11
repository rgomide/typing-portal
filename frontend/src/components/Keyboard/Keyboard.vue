<template>
  <div class="max-w-7xl mx-auto">
    <!-- Keyboard Standard Selector -->
    <div class="mb-6">
      <label for="keyboard-standard" class="block text-sm font-medium text-gray-700 mb-2">
        Keyboard Standard
      </label>
      <select
        id="keyboard-standard"
        v-model="keyboardStandard"
        class="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        <option v-for="standard in availableStandards" :key="standard" :value="standard">
          {{ standard }}
        </option>
      </select>
    </div>

    <!-- Visual Keyboard -->
    <div class="bg-gray-200 p-4 rounded-lg shadow-lg select-none">
      <!-- Function Row -->
      <div class="flex justify-center gap-1 mb-1 flex-wrap">
        <div
          v-for="key in currentLayout.functionRow"
          :key="key.code"
          class="flex flex-col items-center justify-center rounded shadow-sm transition-all duration-200 min-w-[60px] h-10 font-medium cursor-default relative"
          :class="[
            getKeyHighlightClass(key.code) || 'bg-white border border-gray-400 hover:bg-gray-50'
          ]"
        >
          <span class="text-sm leading-none">{{ key.label }}</span>
        </div>
      </div>

      <!-- Number Row -->
      <div class="flex justify-center gap-1 mb-1 flex-wrap">
        <div
          v-for="key in currentLayout.numberRow"
          :key="key.code"
          class="flex flex-col items-center justify-center rounded shadow-sm transition-all duration-200 min-w-[50px] h-[50px] font-medium cursor-default relative"
          :class="[
            getKeyHighlightClass(key.code) || 'bg-white border border-gray-400 hover:bg-gray-50'
          ]"
        >
          <span class="text-sm leading-none">{{ key.label }}</span>
          <span v-if="key.shiftLabel" class="text-[10px] text-gray-500 absolute top-1 right-1">
            {{ key.shiftLabel }}
          </span>
        </div>
      </div>

      <!-- First Row (QWERTY) -->
      <div class="flex justify-center gap-1 mb-1 flex-wrap">
        <div
          v-for="key in currentLayout.firstRow"
          :key="key.code"
          class="flex flex-col items-center justify-center rounded shadow-sm transition-all duration-200 min-w-[50px] h-[50px] font-medium cursor-default relative"
          :class="[
            getSpecialKeySize(key.code),
            getKeyHighlightClass(key.code) || 'bg-white border border-gray-400 hover:bg-gray-50'
          ]"
        >
          <span class="text-sm leading-none">{{ key.label }}</span>
        </div>
      </div>

      <!-- Second Row -->
      <div class="flex justify-center gap-1 mb-1 flex-wrap">
        <div
          v-for="key in currentLayout.secondRow"
          :key="key.code"
          class="flex flex-col items-center justify-center rounded shadow-sm transition-all duration-200 min-w-[50px] h-[50px] font-medium cursor-default relative"
          :class="[
            getSpecialKeySize(key.code),
            getKeyHighlightClass(key.code) || 'bg-white border border-gray-400 hover:bg-gray-50'
          ]"
        >
          <span class="text-sm leading-none">{{ key.label }}</span>
        </div>
      </div>

      <!-- Third Row -->
      <div class="flex justify-center gap-1 mb-1 flex-wrap">
        <div
          v-for="key in currentLayout.thirdRow"
          :key="key.code"
          class="flex flex-col items-center justify-center rounded shadow-sm transition-all duration-200 min-w-[50px] h-[50px] font-medium cursor-default relative"
          :class="[
            getSpecialKeySize(key.code),
            getKeyHighlightClass(key.code) || 'bg-white border border-gray-400 hover:bg-gray-50'
          ]"
        >
          <span class="text-sm leading-none">{{ key.label }}</span>
        </div>
      </div>

      <!-- Space Bar Row -->
      <div class="flex justify-center gap-1 flex-wrap">
        <div
          v-for="key in currentLayout.spaceRow"
          :key="key.code"
          class="flex flex-col items-center justify-center rounded shadow-sm transition-all duration-200 h-[50px] font-medium cursor-default relative"
          :class="[
            getSpecialKeySize(key.code),
            getKeyHighlightClass(key.code) || 'bg-white border border-gray-400 hover:bg-gray-50'
          ]"
        >
          <span class="text-sm leading-none">{{ key.label }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const keyboardStandard = defineModel({
  type: String,
  default: 'ABNT2'
})

const props = defineProps({
  highlightedKeys: {
    type: Object,
    default: () => ({})
  }
})

// Available keyboard standards
const availableStandards = ['ABNT2', 'QWERTY-US', 'QWERTY-UK', 'AZERTY-FR', 'QWERTZ-DE']

// Keyboard layout definitions
const keyboardLayouts = {
  ABNT2: {
    functionRow: [
      { code: 'Escape', label: 'Esc' },
      { code: 'F1', label: 'F1' },
      { code: 'F2', label: 'F2' },
      { code: 'F3', label: 'F3' },
      { code: 'F4', label: 'F4' },
      { code: 'F5', label: 'F5' },
      { code: 'F6', label: 'F6' },
      { code: 'F7', label: 'F7' },
      { code: 'F8', label: 'F8' },
      { code: 'F9', label: 'F9' },
      { code: 'F10', label: 'F10' },
      { code: 'F11', label: 'F11' },
      { code: 'F12', label: 'F12' }
    ],
    numberRow: [
      { code: 'Backquote', label: '`', shiftLabel: '~' },
      { code: 'Digit1', label: '1', shiftLabel: '!' },
      { code: 'Digit2', label: '2', shiftLabel: '@' },
      { code: 'Digit3', label: '3', shiftLabel: '#' },
      { code: 'Digit4', label: '4', shiftLabel: '$' },
      { code: 'Digit5', label: '5', shiftLabel: '%' },
      { code: 'Digit6', label: '6', shiftLabel: '^' },
      { code: 'Digit7', label: '7', shiftLabel: '&' },
      { code: 'Digit8', label: '8', shiftLabel: '*' },
      { code: 'Digit9', label: '9', shiftLabel: '(' },
      { code: 'Digit0', label: '0', shiftLabel: ')' },
      { code: 'Minus', label: '-', shiftLabel: '_' },
      { code: 'Equal', label: '=', shiftLabel: '+' }
    ],
    firstRow: [
      { code: 'KeyQ', label: 'Q' },
      { code: 'KeyW', label: 'W' },
      { code: 'KeyE', label: 'E' },
      { code: 'KeyR', label: 'R' },
      { code: 'KeyT', label: 'T' },
      { code: 'KeyY', label: 'Y' },
      { code: 'KeyU', label: 'U' },
      { code: 'KeyI', label: 'I' },
      { code: 'KeyO', label: 'O' },
      { code: 'KeyP', label: 'P' },
      { code: 'BracketLeft', label: '[', shiftLabel: '{' },
      { code: 'BracketRight', label: ']', shiftLabel: '}' }
    ],
    secondRow: [
      { code: 'KeyA', label: 'A' },
      { code: 'KeyS', label: 'S' },
      { code: 'KeyD', label: 'D' },
      { code: 'KeyF', label: 'F' },
      { code: 'KeyG', label: 'G' },
      { code: 'KeyH', label: 'H' },
      { code: 'KeyJ', label: 'J' },
      { code: 'KeyK', label: 'K' },
      { code: 'KeyL', label: 'L' },
      { code: 'Semicolon', label: 'Ç', shiftLabel: 'ç' },
      { code: 'Quote', label: "'", shiftLabel: '"' }
    ],
    thirdRow: [
      { code: 'KeyZ', label: 'Z' },
      { code: 'KeyX', label: 'X' },
      { code: 'KeyC', label: 'C' },
      { code: 'KeyV', label: 'V' },
      { code: 'KeyB', label: 'B' },
      { code: 'KeyN', label: 'N' },
      { code: 'KeyM', label: 'M' },
      { code: 'Comma', label: ',', shiftLabel: '<' },
      { code: 'Period', label: '.', shiftLabel: '>' },
      { code: 'Slash', label: '/', shiftLabel: '?' }
    ],
    spaceRow: [
      { code: 'ControlLeft', label: 'Ctrl' },
      { code: 'AltLeft', label: 'Alt' },
      { code: 'Space', label: 'Space' },
      { code: 'AltRight', label: 'Alt' },
      { code: 'ControlRight', label: 'Ctrl' }
    ]
  },
  'QWERTY-US': {
    functionRow: [
      { code: 'Escape', label: 'Esc' },
      { code: 'F1', label: 'F1' },
      { code: 'F2', label: 'F2' },
      { code: 'F3', label: 'F3' },
      { code: 'F4', label: 'F4' },
      { code: 'F5', label: 'F5' },
      { code: 'F6', label: 'F6' },
      { code: 'F7', label: 'F7' },
      { code: 'F8', label: 'F8' },
      { code: 'F9', label: 'F9' },
      { code: 'F10', label: 'F10' },
      { code: 'F11', label: 'F11' },
      { code: 'F12', label: 'F12' }
    ],
    numberRow: [
      { code: 'Backquote', label: '`', shiftLabel: '~' },
      { code: 'Digit1', label: '1', shiftLabel: '!' },
      { code: 'Digit2', label: '2', shiftLabel: '@' },
      { code: 'Digit3', label: '3', shiftLabel: '#' },
      { code: 'Digit4', label: '4', shiftLabel: '$' },
      { code: 'Digit5', label: '5', shiftLabel: '%' },
      { code: 'Digit6', label: '6', shiftLabel: '^' },
      { code: 'Digit7', label: '7', shiftLabel: '&' },
      { code: 'Digit8', label: '8', shiftLabel: '*' },
      { code: 'Digit9', label: '9', shiftLabel: '(' },
      { code: 'Digit0', label: '0', shiftLabel: ')' },
      { code: 'Minus', label: '-', shiftLabel: '_' },
      { code: 'Equal', label: '=', shiftLabel: '+' },
      { code: 'Backspace', label: 'Backspace' }
    ],
    firstRow: [
      { code: 'Tab', label: 'Tab' },
      { code: 'KeyQ', label: 'Q' },
      { code: 'KeyW', label: 'W' },
      { code: 'KeyE', label: 'E' },
      { code: 'KeyR', label: 'R' },
      { code: 'KeyT', label: 'T' },
      { code: 'KeyY', label: 'Y' },
      { code: 'KeyU', label: 'U' },
      { code: 'KeyI', label: 'I' },
      { code: 'KeyO', label: 'O' },
      { code: 'KeyP', label: 'P' },
      { code: 'BracketLeft', label: '[', shiftLabel: '{' },
      { code: 'BracketRight', label: ']', shiftLabel: '}' },
      { code: 'Backslash', label: '\\', shiftLabel: '|' }
    ],
    secondRow: [
      { code: 'CapsLock', label: 'Caps' },
      { code: 'KeyA', label: 'A' },
      { code: 'KeyS', label: 'S' },
      { code: 'KeyD', label: 'D' },
      { code: 'KeyF', label: 'F' },
      { code: 'KeyG', label: 'G' },
      { code: 'KeyH', label: 'H' },
      { code: 'KeyJ', label: 'J' },
      { code: 'KeyK', label: 'K' },
      { code: 'KeyL', label: 'L' },
      { code: 'Semicolon', label: ';', shiftLabel: ':' },
      { code: 'Quote', label: "'", shiftLabel: '"' },
      { code: 'Enter', label: 'Enter' }
    ],
    thirdRow: [
      { code: 'ShiftLeft', label: 'Shift' },
      { code: 'KeyZ', label: 'Z' },
      { code: 'KeyX', label: 'X' },
      { code: 'KeyC', label: 'C' },
      { code: 'KeyV', label: 'V' },
      { code: 'KeyB', label: 'B' },
      { code: 'KeyN', label: 'N' },
      { code: 'KeyM', label: 'M' },
      { code: 'Comma', label: ',', shiftLabel: '<' },
      { code: 'Period', label: '.', shiftLabel: '>' },
      { code: 'Slash', label: '/', shiftLabel: '?' },
      { code: 'ShiftRight', label: 'Shift' }
    ],
    spaceRow: [
      { code: 'ControlLeft', label: 'Ctrl' },
      { code: 'MetaLeft', label: 'Win' },
      { code: 'AltLeft', label: 'Alt' },
      { code: 'Space', label: 'Space' },
      { code: 'AltRight', label: 'Alt' },
      { code: 'MetaRight', label: 'Win' },
      { code: 'ControlRight', label: 'Ctrl' }
    ]
  },
  'QWERTY-UK': {
    functionRow: [
      { code: 'Escape', label: 'Esc' },
      { code: 'F1', label: 'F1' },
      { code: 'F2', label: 'F2' },
      { code: 'F3', label: 'F3' },
      { code: 'F4', label: 'F4' },
      { code: 'F5', label: 'F5' },
      { code: 'F6', label: 'F6' },
      { code: 'F7', label: 'F7' },
      { code: 'F8', label: 'F8' },
      { code: 'F9', label: 'F9' },
      { code: 'F10', label: 'F10' },
      { code: 'F11', label: 'F11' },
      { code: 'F12', label: 'F12' }
    ],
    numberRow: [
      { code: 'Backquote', label: '`', shiftLabel: '¬' },
      { code: 'Digit1', label: '1', shiftLabel: '!' },
      { code: 'Digit2', label: '2', shiftLabel: '"' },
      { code: 'Digit3', label: '3', shiftLabel: '£' },
      { code: 'Digit4', label: '4', shiftLabel: '$' },
      { code: 'Digit5', label: '5', shiftLabel: '%' },
      { code: 'Digit6', label: '6', shiftLabel: '^' },
      { code: 'Digit7', label: '7', shiftLabel: '&' },
      { code: 'Digit8', label: '8', shiftLabel: '*' },
      { code: 'Digit9', label: '9', shiftLabel: '(' },
      { code: 'Digit0', label: '0', shiftLabel: ')' },
      { code: 'Minus', label: '-', shiftLabel: '_' },
      { code: 'Equal', label: '=', shiftLabel: '+' }
    ],
    firstRow: [
      { code: 'KeyQ', label: 'Q' },
      { code: 'KeyW', label: 'W' },
      { code: 'KeyE', label: 'E' },
      { code: 'KeyR', label: 'R' },
      { code: 'KeyT', label: 'T' },
      { code: 'KeyY', label: 'Y' },
      { code: 'KeyU', label: 'U' },
      { code: 'KeyI', label: 'I' },
      { code: 'KeyO', label: 'O' },
      { code: 'KeyP', label: 'P' },
      { code: 'BracketLeft', label: '[', shiftLabel: '{' },
      { code: 'BracketRight', label: ']', shiftLabel: '}' }
    ],
    secondRow: [
      { code: 'KeyA', label: 'A' },
      { code: 'KeyS', label: 'S' },
      { code: 'KeyD', label: 'D' },
      { code: 'KeyF', label: 'F' },
      { code: 'KeyG', label: 'G' },
      { code: 'KeyH', label: 'H' },
      { code: 'KeyJ', label: 'J' },
      { code: 'KeyK', label: 'K' },
      { code: 'KeyL', label: 'L' },
      { code: 'Semicolon', label: ';', shiftLabel: ':' },
      { code: 'Quote', label: "'", shiftLabel: '@' }
    ],
    thirdRow: [
      { code: 'KeyZ', label: 'Z' },
      { code: 'KeyX', label: 'X' },
      { code: 'KeyC', label: 'C' },
      { code: 'KeyV', label: 'V' },
      { code: 'KeyB', label: 'B' },
      { code: 'KeyN', label: 'N' },
      { code: 'KeyM', label: 'M' },
      { code: 'Comma', label: ',', shiftLabel: '<' },
      { code: 'Period', label: '.', shiftLabel: '>' },
      { code: 'Slash', label: '/', shiftLabel: '?' }
    ],
    spaceRow: [
      { code: 'ControlLeft', label: 'Ctrl' },
      { code: 'AltLeft', label: 'Alt' },
      { code: 'Space', label: 'Space' },
      { code: 'AltRight', label: 'Alt' },
      { code: 'ControlRight', label: 'Ctrl' }
    ]
  },
  'AZERTY-FR': {
    functionRow: [
      { code: 'Escape', label: 'Esc' },
      { code: 'F1', label: 'F1' },
      { code: 'F2', label: 'F2' },
      { code: 'F3', label: 'F3' },
      { code: 'F4', label: 'F4' },
      { code: 'F5', label: 'F5' },
      { code: 'F6', label: 'F6' },
      { code: 'F7', label: 'F7' },
      { code: 'F8', label: 'F8' },
      { code: 'F9', label: 'F9' },
      { code: 'F10', label: 'F10' },
      { code: 'F11', label: 'F11' },
      { code: 'F12', label: 'F12' }
    ],
    numberRow: [
      { code: 'Backquote', label: '²' },
      { code: 'Digit1', label: '&', shiftLabel: '1' },
      { code: 'Digit2', label: 'é', shiftLabel: '2' },
      { code: 'Digit3', label: '"', shiftLabel: '3' },
      { code: 'Digit4', label: "'", shiftLabel: '4' },
      { code: 'Digit5', label: '(', shiftLabel: '5' },
      { code: 'Digit6', label: '-', shiftLabel: '6' },
      { code: 'Digit7', label: 'è', shiftLabel: '7' },
      { code: 'Digit8', label: '_', shiftLabel: '8' },
      { code: 'Digit9', label: 'ç', shiftLabel: '9' },
      { code: 'Digit0', label: 'à', shiftLabel: '0' },
      { code: 'Minus', label: ')', shiftLabel: '°' },
      { code: 'Equal', label: '=', shiftLabel: '+' }
    ],
    firstRow: [
      { code: 'KeyQ', label: 'A' },
      { code: 'KeyW', label: 'Z' },
      { code: 'KeyE', label: 'E' },
      { code: 'KeyR', label: 'R' },
      { code: 'KeyT', label: 'T' },
      { code: 'KeyY', label: 'Y' },
      { code: 'KeyU', label: 'U' },
      { code: 'KeyI', label: 'I' },
      { code: 'KeyO', label: 'O' },
      { code: 'KeyP', label: 'P' },
      { code: 'BracketLeft', label: '^', shiftLabel: '¨' },
      { code: 'BracketRight', label: '$', shiftLabel: '£' }
    ],
    secondRow: [
      { code: 'KeyA', label: 'Q' },
      { code: 'KeyS', label: 'S' },
      { code: 'KeyD', label: 'D' },
      { code: 'KeyF', label: 'F' },
      { code: 'KeyG', label: 'G' },
      { code: 'KeyH', label: 'H' },
      { code: 'KeyJ', label: 'J' },
      { code: 'KeyK', label: 'K' },
      { code: 'KeyL', label: 'L' },
      { code: 'Semicolon', label: 'M', shiftLabel: 'M' },
      { code: 'Quote', label: 'ù', shiftLabel: '%' }
    ],
    thirdRow: [
      { code: 'KeyZ', label: 'W' },
      { code: 'KeyX', label: 'X' },
      { code: 'KeyC', label: 'C' },
      { code: 'KeyV', label: 'V' },
      { code: 'KeyB', label: 'B' },
      { code: 'KeyN', label: 'N' },
      { code: 'KeyM', label: ',', shiftLabel: '?' },
      { code: 'Comma', label: ';', shiftLabel: '.' },
      { code: 'Period', label: ':', shiftLabel: '/' },
      { code: 'Slash', label: '!', shiftLabel: '§' }
    ],
    spaceRow: [
      { code: 'ControlLeft', label: 'Ctrl' },
      { code: 'AltLeft', label: 'Alt' },
      { code: 'Space', label: 'Space' },
      { code: 'AltRight', label: 'Alt Gr' },
      { code: 'ControlRight', label: 'Ctrl' }
    ]
  },
  'QWERTZ-DE': {
    functionRow: [
      { code: 'Escape', label: 'Esc' },
      { code: 'F1', label: 'F1' },
      { code: 'F2', label: 'F2' },
      { code: 'F3', label: 'F3' },
      { code: 'F4', label: 'F4' },
      { code: 'F5', label: 'F5' },
      { code: 'F6', label: 'F6' },
      { code: 'F7', label: 'F7' },
      { code: 'F8', label: 'F8' },
      { code: 'F9', label: 'F9' },
      { code: 'F10', label: 'F10' },
      { code: 'F11', label: 'F11' },
      { code: 'F12', label: 'F12' }
    ],
    numberRow: [
      { code: 'Backquote', label: '^', shiftLabel: '°' },
      { code: 'Digit1', label: '1', shiftLabel: '!' },
      { code: 'Digit2', label: '2', shiftLabel: '"' },
      { code: 'Digit3', label: '3', shiftLabel: '§' },
      { code: 'Digit4', label: '4', shiftLabel: '$' },
      { code: 'Digit5', label: '5', shiftLabel: '%' },
      { code: 'Digit6', label: '6', shiftLabel: '&' },
      { code: 'Digit7', label: '7', shiftLabel: '/' },
      { code: 'Digit8', label: '8', shiftLabel: '(' },
      { code: 'Digit9', label: '9', shiftLabel: ')' },
      { code: 'Digit0', label: '0', shiftLabel: '=' },
      { code: 'Minus', label: 'ß', shiftLabel: '?' },
      { code: 'Equal', label: '´', shiftLabel: '`' }
    ],
    firstRow: [
      { code: 'KeyQ', label: 'Q' },
      { code: 'KeyW', label: 'W' },
      { code: 'KeyE', label: 'E' },
      { code: 'KeyR', label: 'R' },
      { code: 'KeyT', label: 'T' },
      { code: 'KeyZ', label: 'Z' },
      { code: 'KeyU', label: 'U' },
      { code: 'KeyI', label: 'I' },
      { code: 'KeyO', label: 'O' },
      { code: 'KeyP', label: 'P' },
      { code: 'BracketLeft', label: 'ü', shiftLabel: 'Ü' },
      { code: 'BracketRight', label: '+', shiftLabel: '*' }
    ],
    secondRow: [
      { code: 'KeyA', label: 'A' },
      { code: 'KeyS', label: 'S' },
      { code: 'KeyD', label: 'D' },
      { code: 'KeyF', label: 'F' },
      { code: 'KeyG', label: 'G' },
      { code: 'KeyH', label: 'H' },
      { code: 'KeyJ', label: 'J' },
      { code: 'KeyK', label: 'K' },
      { code: 'KeyL', label: 'L' },
      { code: 'Semicolon', label: 'ö', shiftLabel: 'Ö' },
      { code: 'Quote', label: 'ä', shiftLabel: 'Ä' },
      { code: 'Backslash', label: '#', shiftLabel: "'" }
    ],
    thirdRow: [
      { code: 'KeyY', label: 'Y' },
      { code: 'KeyX', label: 'X' },
      { code: 'KeyC', label: 'C' },
      { code: 'KeyV', label: 'V' },
      { code: 'KeyB', label: 'B' },
      { code: 'KeyN', label: 'N' },
      { code: 'KeyM', label: 'M' },
      { code: 'Comma', label: ',', shiftLabel: ';' },
      { code: 'Period', label: '.', shiftLabel: ':' },
      { code: 'Slash', label: '-', shiftLabel: '_' }
    ],
    spaceRow: [
      { code: 'ControlLeft', label: 'Ctrl' },
      { code: 'AltLeft', label: 'Alt' },
      { code: 'Space', label: 'Space' },
      { code: 'AltRight', label: 'Alt Gr' },
      { code: 'ControlRight', label: 'Ctrl' }
    ]
  }
}

// Computed property for current layout
const currentLayout = computed(() => {
  const standard = keyboardStandard.value || 'ABNT2'
  return keyboardLayouts[standard] || keyboardLayouts.ABNT2
})

// Get special key sizes
const getSpecialKeySize = (code) => {
  const sizeMap = {
    Space: 'min-w-[300px]',
    ShiftLeft: 'min-w-[100px]',
    ShiftRight: 'min-w-[100px]',
    ControlLeft: 'min-w-[70px]',
    ControlRight: 'min-w-[70px]',
    AltLeft: 'min-w-[70px]',
    AltRight: 'min-w-[70px]',
    Enter: 'min-w-[100px]',
    Backspace: 'min-w-[100px]',
    Tab: 'min-w-[80px]',
    CapsLock: 'min-w-[90px]',
    Escape: 'min-w-[80px]',
    MetaLeft: 'min-w-[70px]',
    MetaRight: 'min-w-[70px]'
  }
  return sizeMap[code] || ''
}

// Get key highlight classes based on color value
const getKeyHighlightClass = (code) => {
  const color = props.highlightedKeys[code]
  if (!color) return ''

  const colorMap = {
    blue: 'bg-blue-500 text-white border-blue-600 shadow-lg',
    red: 'bg-red-500 text-white border-red-600 shadow-lg',
    green: 'bg-green-500 text-white border-green-600 shadow-lg',
    yellow: 'bg-yellow-500 text-white border-yellow-600 shadow-lg',
    purple: 'bg-purple-500 text-white border-purple-600 shadow-lg',
    orange: 'bg-orange-500 text-white border-orange-600 shadow-lg'
  }

  return colorMap[color] || ''
}
</script>
