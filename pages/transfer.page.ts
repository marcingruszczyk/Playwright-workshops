import { Page } from '@playwright/test';
import { SideMenuComponent } from '../components/side-menu.components';

export class TransferPage {
  constructor(private page: Page) {}

  sideMenu = new SideMenuComponent(this.page);

  transferReceiver = this.page.getByTestId('transfer_receiver');
  accountNumber = this.page.getByTestId('form_account_to');
  transferAmount = this.page.getByTestId('form_amount');
  transferButton = this.page.getByRole('button', { name: 'wykonaj przelew' });
  closeButton = this.page.getByTestId('close-button');
  transferMessage = this.page.locator('#show_messages');
}
