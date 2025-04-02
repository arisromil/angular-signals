import {
  Component,
  computed,
  effect,
  signal,
  inject,
  Injector,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { switchMap } from 'rxjs/operators';
import { TimeOffRequest } from '../../infrastructure/types/time-off-request.type';
import { TimeOffManagementService } from '../../services/time-off-management.service';

@Component({
  selector: 'app-time-off-management',
  template: `
  <h2>Time Off Management</h2>
  <table>
  <thead>
  <tr>
  <th>Employee</th>
  <th>Start Date</th>
  <th>End Date</th>
  <th>Type</th>
  <th>Status</th>
  <th>Comment</th>
  <th>Actions</th>
  </tr>
  </thead>
  <tbody>
  <tr *ngFor="let request of requests()">
  <td>{{ request.employeeId }}</td>
<td>{{ request.startDate | date }}</td>
<td>{{ request.endDate | date }}</td>
<td>{{ request.type }}</td>
<td>{{ request.status }}</td>
<td>{{ request.comment }}</td>
<td>
<button *ngIf="request.status ===
'Pending'">Approve</button>
<button
*ngIf="request.status === 'Pending'">
Reject
</button>
<button>Delete</button>
</td>
</tr>
</tbody>
</table>
`,
  standalone: true,
  imports: [NgFor, NgIf, DatePipe],
})
export class TimeOffManagementComponent {
  private readonly timeOffsService = inject(TimeOffManagementService);
  requests = this.timeOffsService.requests;
  resolvedRequests = this.timeOffsService.resolvedRequests;
  selectedType = this.timeOffsService.selectedType;

  approveRequest(request: TimeOffRequest) {
    this.timeOffsService.approveRequest(request);
  }

  rejectRequest(request: TimeOffRequest) {
    this.timeOffsService.rejectRequest(request);
  }

  deleteRequest(request: TimeOffRequest) {
    this.timeOffsService.deleteRequest(request);
  }
}
