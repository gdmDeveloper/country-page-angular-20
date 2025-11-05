import { Component, effect, input, linkedSignal, output, signal } from '@angular/core';

@Component({
  selector: 'country-search-input',
  imports: [],
  templateUrl: './search-input.html',
})
export class SearchInput {

    searchValue = output<string>()
    placeholder = input<string>()
    initialValue = input<string>('')

    inputValue = linkedSignal<string>( () => this.initialValue())

    onDebounceEffect = effect( (onCleanup) => {
      const value = this.inputValue();

      const timeout = setTimeout(() => {
        this.searchValue.emit(value);
      }, 300);

      onCleanup( () => {
        clearTimeout(timeout)
      })

    })




}
