import { Page } from '@playwright/test';

export class PulpitPage {
  constructor(private page: Page) {}
  transferReceiver = this.page.locator('#widget_1_transfer_receiver');
  transferAmount = this.page.locator('#widget_1_transfer_amount');
  transferTitle = this.page.locator('#widget_1_transfer_title');
  transferButton = this.page.getByRole('button', { name: 'wykonaj' });
  transferMessage = this.page.locator('#show_messages');
  closeButton = this.page.getByTestId('close-button');

  topUpReceiver = this.page.locator('#widget_1_topup_receiver');
  topUpAmount = this.page.locator('#widget_1_topup_amount');
  topUpCheckBox = this.page.locator('#uniform-widget_1_topup_agreement span');
  topUpButton = this.page.getByRole('button', { name: 'doładuj telefon' });
  availableMoney = this.page.locator('#money_value');
}
