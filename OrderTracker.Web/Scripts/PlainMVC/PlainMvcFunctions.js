function calculateTotal(id) {
    var rateValue = $('#Rate_' + id).val();
    var quantityValue = $('#Quantity_' + id).val();
    var total;

    if (rateValue !== '' && quantityValue !== '') {
        total = Number(rateValue) * Number(quantityValue);
        $('#LineTotal_' + id).html(accounting.formatMoney(total));

        calculateInvoiceTotal();
    }
}

function calculateInvoiceTotal() {
    var rates = $('.rate');
    var total = 0;

    rates.each(function() {
        var rate = Number($(this).val());
        var quantityElementId = $(this).attr('id').replace('Rate_', 'Quantity_');

        var quantity = Number($('#' + quantityElementId).val());

        total += (quantity * rate);
    });    

    $('#InvoiceTotal').html(accounting.formatMoney(total));
}

function getTotals(className) {
    var textBoxes = $('.' + className);
    var total = 0;

    textBoxes.each(function () {
        total += Number($(this).val());
    });

    return total;
}

function saveInvoice(id) {
    if (id > 0) {
        updateInvoice(id);        
    } else {
        addInvoice();
    }
}

function addInvoice() {
    var customerName = $('#CustomerName').val();
    var invoiceDate = $('#InvoiceDate').val();

    $('#notificationMessage').hide();

    $.ajax({        
        type: "POST",
        dataType: "json",
        url: '/api/invoices/',
        data: {
            customerName: customerName,
            invoiceDate: invoiceDate
        },
        success: function(data) {
            document.location = '/Home/InvoiceDetail/' + data.Id;
        },
        error: function(response) {
            $('#notificationMessage').html(response);
            $('#notificationMessage').show();
        }
    });
}

function updateInvoice(id) {
    var customerName = $('#CustomerName').val();
    var invoiceDate = $('#InvoiceDate').val();
    
    $('#notificationMessage').hide();

    $.ajax({
        type: "PUT",
        dataType: "json",
        url: '/api/invoices/' + id,
        data: {
            customerName: customerName,
            invoiceDate: invoiceDate
        },
        success: function () {
            $('#notificationMessage').html('Successfully Updated Invoice');
            $('#notificationMessage').show();
        },
        error: function (response) {
            $('#notificationMessage').html(response);
            $('#notificationMessage').show();
        }
    });
}

function updateLineItem(invoiceId, lineItemId) {
    var task = $('#Task_' + lineItemId).val();
    var quantity = $('#Quantity_' + lineItemId).val();
    var rate = $('#Rate_' + lineItemId).val();

    $('#notificationMessage').hide();

    $.ajax({
        type: "PUT",
        dataType: "json",
        url: '/api/invoices/' + invoiceId + '/LineItems/' + lineItemId,
        data: {
            task: task,
            quantity: quantity,
            rate: rate
        },
        success: function () {
            $('#notificationMessage').html('Successfully Updated Line Item');
            $('#notificationMessage').show();
        },
        error: function (response) {
            $('#notificationMessage').html(response);
            $('#notificationMessage').show();
        }
    });
}

function addLineItem(invoiceId) {
    var task = $('#Task_Add').val();
    var quantity = $('#Quantity_Add').val();
    var rate = $('#Rate_Add').val();

    $('#notificationMessage').hide();

    $.ajax({
        type: "POST",
        dataType: "json",
        url: '/api/invoices/' + invoiceId + '/LineItems',
        data: {
            task: task,
            quantity: quantity,
            rate: rate
        },
        success: function () {
            document.location = '/Home/InvoiceDetail/' + invoiceId;
        },
        error: function (response) {
            $('#notificationMessage').html(response);
            $('#notificationMessage').show();
        }
    });
}