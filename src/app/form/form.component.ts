import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from '../shared/model/product.model';
import { ProductService } from '../shared/services/product.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  dataForm!: FormGroup;
  imageError!: string;

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.dataForm = this.formBuilder.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      image: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.dataForm.invalid) {
      return;
    }
    const product: Product = {
      name: this.dataForm.value.name,
      price: this.dataForm.value.price,
      image: this.dataForm.value.image
    };
    this.productService.addProduct(product);

    console.log(this.productService.getListForConsole());

    this.dataForm.reset();
    this.resetFileInput();
  }

  resetFileInput(): void {
    const fileInput = document.getElementById('image') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }

  handleImageUpload(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement && inputElement.files && inputElement.files.length > 0) {
      const file = inputElement.files[0];
      if (file.size > 100 * 1024) {
        this.imageError = 'Image size must be less than 100KB.';
      } else {
        this.imageError = '';

        const reader = new FileReader();
        reader.onload = (e) => {
          const imageDataURL = reader.result as string;
          this.dataForm.patchValue({ image: imageDataURL });
        };
        reader.readAsDataURL(file);
      }
    }
  }
}
