import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";

@Injectable({
	providedIn: 'root'
})
export class ErrorService {

	constructor(private toastrService: ToastrService) { }

	public showErrorToast(message?: any): void {
		this.toastrService.error(message ?
		`Code: ${message.Code}
		Message: ${message.Message}
		Reference: ${message.Reference}` : 'Something went wrong, please try again later', 'Error')
	}

}
