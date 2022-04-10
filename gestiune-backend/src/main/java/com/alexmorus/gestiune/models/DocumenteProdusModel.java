/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.alexmorus.gestiune.models;

import java.time.LocalDate;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 *
 * @author alexmorus
 */

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DocumenteProdusModel {
    private String document;
    private LocalDate data;
    private String numeAngajat;
    private String modelProdus;    
}
