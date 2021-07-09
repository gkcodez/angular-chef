import { Directive, HostBinding, HostListener, OnInit } from "@angular/core";

@Directive({
    selector: '[appDropdown]'
})
export class DropDownDirective implements OnInit{
    constructor() { }
    @HostBinding('class.dropdown-open') isOpen = false; 

    @HostListener('mouseover') openDropdown() {
        this.isOpen = true; 
    }

    @HostListener('mouseleave') closeDropdown() {
        this.isOpen = false; 
    }

    ngOnInit(){
            
    }
}

